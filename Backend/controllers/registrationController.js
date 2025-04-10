const { Registration, Event } = require('../models');

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const registration = await Registration.create({ user_id: req.user.id, event_id: req.params.id });
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { user_id: req.user.id },
      include: [Event],
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};