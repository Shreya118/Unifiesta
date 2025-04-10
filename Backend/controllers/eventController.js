const { Event, Registration } = require('../models');
const { Op } = require('sequelize');

exports.getAllEvents = async (req, res) => {
  try {
    const { category, date, location } = req.query;
    const where = {};
    if (category) where.category = category;
    if (date) where.date = { [Op.gte]: date };
    if (location) where.location = location;
    const events = await Event.findAll({
      where,
      include: [{ model: Registration, attributes: ['id'] }],
    });
    const eventsWithCount = events.map(event => ({
      ...event.toJSON(),
      registrationCount: event.Registrations.length,
    }));
    res.json(eventsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: Registration, attributes: ['user_id'] }],
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ ...event.toJSON(), registeredUsers: event.Registrations.map(r => r.user_id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, created_by: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};