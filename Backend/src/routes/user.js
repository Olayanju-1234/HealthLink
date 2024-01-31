const { Router } = require('express');
const UserController = require('../controllers/user');

const userController = new UserController();

const router = Router();

router.get('/', userController.allUsers);
router.get('/profile/:id', userController.userById);
router.get('/clients', userController.getAllClients);
router.get('/therapists', userController.getAllTherapists);

const UserRouter = router;

module.exports = { UserRouter };
