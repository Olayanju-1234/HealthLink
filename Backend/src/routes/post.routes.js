const { Router } = require('express');
const PostController = require('../controllers/post');

const postController = new PostController();

const router = Router();

router.get('/', postController.allPosts);
router.get('/:id', postController.postById);
router.post('/', postController.createPost);

const PostRouter = router;

module.exports = { PostRouter };