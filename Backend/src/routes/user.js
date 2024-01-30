const { Router } = require('express');
const UserController = require('../controllers/user');

const userController = new UserController();

const router = Router();

router.get('/', userController.allUsers);
router.get('/:id', userController.userById);
router.get('/:account_type', userController.userByAccountType);

const UserRouter = router;

module.exports = { UserRouter };
