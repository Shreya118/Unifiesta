const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { validateEvent } = require('../middleware/validation');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', authenticate, isAdmin, validateEvent, eventController.createEvent);
router.put('/:id', authenticate, isAdmin, validateEvent, eventController.updateEvent);
router.delete('/:id', authenticate, isAdmin, eventController.deleteEvent);

module.exports = router;