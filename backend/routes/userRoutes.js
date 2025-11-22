const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUserFields = require('../middlewares/validateUser');
const validateUpdateUser = require('../middlewares/validateUpdateUser');

// Create a user with validation middleware
router.post('/', validateUserFields, userController.createUser);

// Update a user with validation middleware
router.put('/:userId', validateUpdateUser, userController.updateUser);

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
