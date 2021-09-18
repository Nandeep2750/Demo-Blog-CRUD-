const express = require('express');
const router = express.Router();

const auth = require("../../middleware/validateRequest");

const blogController = require('../../controllers/admin/blogController');

router.post('/add',auth,blogController.addPost);
router.post('/edit',auth,blogController.editPost);
router.post('/list',auth,blogController.listPost);
router.post('/get_post_by_id',auth,blogController.getPostByID);
router.post('/change_post_status',auth,blogController.changePostStatus);
router.post('/delete',auth,blogController.deletePost);

module.exports = router;