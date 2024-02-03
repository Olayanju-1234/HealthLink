const { Router } = require('express');
const UserController = require('../controllers/user');

const userController = new UserController();

const router = Router();

router.get('/', userController.allUsers);
router.get('/profile/:id', userController.userById);
router.get('/clients', userController.getAllClients);
router.get('/therapists', userController.getAllTherapists);
router.put('/client-profile/:id', userController.setClientProfile);
router.put('/therapist-profile/:id', userController.setTherapistProfile);
router.get('/profile/:id', userController.getProfile);

const UserRouter = router;

module.exports = { UserRouter };
