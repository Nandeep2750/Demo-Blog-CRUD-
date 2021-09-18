const sequelize = require('sequelize');
const Op = sequelize.Op;
const { AdminController } = require('./adminController');

const postModel = require('../../models').tbl_post;

const status = require('../../config/statuscode').status;
const constants = require('../../config/constants');


class BlogController extends AdminController {

    constructor() {
        super();
    }

    /* Add Post */
    async addPost(req, res) {
        try {
            await postModel
                .findOne({
                    where: {
                        vSlug: req.body.vSlug,
                        isDeleted: 0
                    }
                }).then(async (post) => {
                    if (post) {
                        return res.json({
                            status: status.conflict_code,
                            message: "Slug is already available. Please try another one.",
                            success: false
                        });
                    } else {
                        postModel.create({
                            vTitle: req.body.vTitle,
                            vSlug: req.body.vSlug,
                            tBody: req.body.tBody,
                            dtCreatedAt: new Date(),
                        }).then(async (postData) => {
                            return res.json({
                                status: status.success_code,
                                message: "Post created successfully.",
                                success: true,
                                data: postData
                            });
                        }).catch(function (err) {
                            return res.json({
                                status: status.bad_request_code,
                                message: err.message,
                                success: false,
                            });
                        });
                    }
                }).catch(function (err) {
                    return res.json({
                        status: status.bad_request_code,
                        message: err.message,
                        success: false,
                    });
                });
        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 56 ~ BlogController ~ addPost ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }


    /* Edit Post */
    async editPost(req, res) {
        try {
            await postModel
                .findOne({
                    where: {
                        iPostID: parseInt(req.body.iPostID),
                        isDeleted: 0,
                    }
                }).then(async (post) => {

                    if (post) {
                        await postModel
                            .findOne({
                                where: {
                                    isDeleted: 0,
                                    [Op.not]: { iPostID: parseInt(req.body.iPostID) },
                                    vSlug: req.body.vSlug
                                }
                            }).then(async (checkOtherPost) => {
                                if (checkOtherPost) {
                                    return res.json({
                                        status: status.conflict_code,
                                        message: "Post Slug is already used in other post. Please try another one.",
                                        success: false
                                    });
                                } else {
                                    post.update({
                                        vTitle: req.body.vTitle,
                                        vSlug: req.body.vSlug,
                                        tBody: req.body.tBody,
                                        dtUpdatedAt: new Date(),
                                    }).then(async (resData) => {
                                        return res.json({
                                            status: status.success_code,
                                            message: "Post has beed updated successfully.",
                                            success: true,
                                            data: resData
                                        });
                                    })
                                }
                            }).catch(function (err) {
                                return res.json({
                                    status: status.bad_request_code,
                                    message: err.message,
                                    success: false,
                                });
                            });

                    } else {
                        return res.json({
                            status: status.not_found_code,
                            message: "Post not found.",
                            success: false,
                        });
                    }
                })

        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 122 ~ BlogController ~ editPost ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }


    /* List Post */
    async listPost(req, res) {
        try {
            await postModel
                .findAll({
                    where: {
                        isDeleted: 0,
                    }
                }).then(async (posts) => {
                    return res.json({
                        status: status.success_code,
                        message: "Posts found successfully.",
                        success: true,
                        data: posts
                    });
                }).catch(function (err) {
                    return res.json({
                        status: status.bad_request_code,
                        message: err.message,
                        success: false,
                    });
                });

        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 167 ~ BlogController ~ listPost ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

    /* Get Blog Post by ID */
    async getPostByID(req, res) {
        try {
            await postModel
                .findOne({
                    where: {
                        iPostID: parseInt(req.body.iPostID),
                        isDeleted: 0,
                    }
                }).then(async (post) => {

                    if (post) {
                        return res.json({
                            status: status.success_code,
                            message: "Post found successfully.",
                            success: true,
                            data: post
                        });
                    } else {
                        return res.json({
                            status: status.not_found_code,
                            message: "Post not found.",
                            success: false,
                        });
                    }
                }).catch(function (err) {
                    return res.json({
                        status: status.bad_request_code,
                        message: err.message,
                        success: false,
                    });
                });

        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 167 ~ BlogController ~ listPost ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

    /* Change Post Status */
    async changePostStatus(req, res) {
        try {
            await postModel
                .findOne({
                    where: {
                        iPostID: parseInt(req.body.iPostID),
                        isDeleted: 0,
                    }
                }).then(async (post) => {
                    if (post) {
                        if (post.isActive == 0) {
                            post.update({
                                isActive: 1,
                                dtUpdatedAt: new Date()
                            }).then(async (response) => {
                                return res.json({
                                    status: status.success_code,
                                    message: "Post status successfully Actived.",
                                    success: true,
                                    data: response
                                });
                            })
                        } else if (post.isActive == 1) {
                            post.update({
                                isActive: 0,
                                dtUpdatedAt: new Date()
                            }).then(async (response) => {
                                return res.json({
                                    status: status.success_code,
                                    message: "Post status successfully Inactived.",
                                    success: true,
                                    data: response
                                });
                            })
                        }
                    } else {
                        return res.json({
                            status: status.not_found_code,
                            message: "Post not found.",
                            success: false,
                        });
                    }
                }).catch(function (err) {
                    return res.json({
                        status: status.bad_request_code,
                        message: err.message,
                        success: false,
                    });
                });
        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 225 ~ BlogController ~ changePostStatus ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

    /* Delete Blog Post */
    async deletePost(req, res) {
        try {
            await postModel
                .findOne({
                    where: {
                        iPostID: parseInt(req.body.iPostID),
                        isDeleted: 0,
                    }
                }).then(async (post) => {
                    if (post) {
                        post.update({
                            isDeleted: 1,
                            dtUpdatedAt: new Date(),
                            dtDeletedAt: new Date(),
                        }).then(async (response) => {
                            return res.json({
                                status: status.success_code,
                                message: "Post status successfully deleted.",
                                success: true,
                            });
                        })
                    } else {
                        return res.json({
                            status: status.not_found_code,
                            message: "Post not found.",
                            success: false,
                        });
                    }
                }).catch(function (err) {
                    return res.json({
                        status: status.bad_request_code,
                        message: err.message,
                        success: false,
                    });
                });
        } catch (err) {
            console.log("🚀 ~ file: blogController.js ~ line 274 ~ BlogController ~ deletePost ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }


}

module.exports = new BlogController();