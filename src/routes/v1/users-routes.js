const express = require('express');
const { isAuth, isValidHostname, isAdmin } = require('../../middlewares/auth');
const usersController = require('../../controllers/v1/users-controller');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', isValidHostname, isAuth, usersController.updateUser);
router.post('/delete', isValidHostname, isAuth, isAdmin, usersController.deleteUser);
router.get('/get-users', isValidHostname, isAuth, isAdmin, usersController.getUsers);

module.exports = router;
