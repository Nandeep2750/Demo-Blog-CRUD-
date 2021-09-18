const jwt = require('jwt-simple');
const bcrypt = require("bcrypt");
const { AdminController } = require('./adminController');

const adminModel = require('../../models').tbl_user;

const status = require('../../config/statuscode').status;
const constants = require('../../config/constants');


class AuthController extends AdminController {

    constructor() {
        super();
    }

    /* Register as Admin */
    async registerAdmin(req, res) {
        try {
            let admin = await adminModel
                .findOne({
                    where: {
                        vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                        isDeleted: 0
                    }
                })

            if (admin) {
                return res.json({
                    status: status.conflict_code,
                    message: "Email is already registered. Please try another one.",
                    success: false
                });
            } else {
                if (req.body.vPassword) {
                    bcrypt.hash(req.body.vPassword, 10, (err, hash) => {
                        if (err) {
                            console.log("🚀 ~ file: authController.js ~ line 37 ~ AuthController ~ bcrypt.hash ~ err", err)
                            return res.json({
                                status: status.internal_server_error_code,
                                message: "Something went wrong",
                                success: false,
                            });
                        } else {
                            let vHashedPassword = hash;
    
                            adminModel.create({
                                vUserName: req.body.vUserName,
                                vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                                vPassword: vHashedPassword,
                                dtCreatedAt: new Date(),
                            }).then(async (adminData) => {
                                return res.json({
                                    status: status.success_code,
                                    message: "Admin has been successfully registered",
                                    success: true,
                                    data: adminData
                                });
                            }).catch(function (err) {
                                return res.json({
                                    status: status.bad_request_code,
                                    message: err.message,
                                    success: false,
                                });
                            });
    
                        }
                    });
                }else{
                    return res.json({
                        status: status.bad_request_code,
                        message: "Do not allow empty Password",
                        success: false,
                    });
                }
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 73 ~ AuthController ~ registerAdmin ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

    /* Login Admin */
    async loginAdmin(req, res) {
        try {
            let admin = await adminModel
                .findOne({
                    where: {
                        vEmail: (req.body.vEmail) ? (req.body.vEmail.toLowerCase()) : '',
                        isDeleted: 0
                    }
                })

            if (admin == null) {
                return res.json({
                    status: status.not_found_code,
                    message: "Account doesn't exist for this email, Please check email.",
                    success: false,
                });
            } else {
                if (req.body.vPassword) {
                    bcrypt.compare(req.body.vPassword, admin.vPassword, async (err, isMatch) => {
                        if (isMatch && !err) {
    
                            let dateObj = new Date();
                            let minutes = 60;
                            let expiration_time = new Date(dateObj.getTime() + minutes * 60000);
                            let token = jwt.encode({ exp: expiration_time, iUserID: admin.iUserID }, constants.JWT_ENCRYPTION_KEY);
    
                            let resData = JSON.parse(JSON.stringify(admin));
                            resData.token = token;
    
                            return res.json({
                                status: status.success_code,
                                success: true,
                                message: "Admin logged in successfully.",
                                data: resData
                            });
    
                        } else {
                            return res.json({
                                status: status.unauthorized_code,
                                message: "Password is incorrect.",
                                success: false,
                            });
                        }
                    })
                } else {
                    return res.json({
                        status: status.bad_request_code,
                        message: "Do not allow empty Password",
                        success: false,
                    });
                }
                
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.js ~ line 144 ~ AuthController ~ loginAdmin ~ err", err)
            return res.json({
                status: status.internal_server_error_code,
                message: "Something went wrong",
                success: false
            });
        }
    }

}

module.exports = new AuthController();