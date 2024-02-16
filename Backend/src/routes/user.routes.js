const { Router } = require('express');
const UserController = require('../controllers/user');
const { auth, IsUserTherapist, IsUserClient } = require('../middlewares/authMiddleware');

const userController = new UserController();

const router = Router();

router.get('/', userController.allUsers);
router.get('/profile/:id', userController.userById);
router.get('/clients', userController.getAllClients);
router.get('/therapists', userController.getAllTherapists);
router.patch('/client-profile/:id', [auth, IsUserClient], userController.setClientProfile);
router.patch('/therapist-profile/:id', [auth, IsUserTherapist], userController.setTherapistProfile);
router.get('/profile/:id', userController.getProfile);
router.get('/available-therapists', userController.availableTherapists);

const UserRouter = router;

module.exports = { UserRouter };
