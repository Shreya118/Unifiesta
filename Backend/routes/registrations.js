const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { authenticate } = require('../middleware/auth');

router.post('/:id/register', authenticate, registrationController.registerForEvent);
router.get('/my-registrations', authenticate, registrationController.getUserRegistrations);

module.exports = router;