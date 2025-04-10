const cron = require('node-cron');
const { Event, Registration, User } = require('./models');
const { Op } = require('sequelize');
const emailService = require('./services/emailService');

cron.schedule('0 9 * * *', async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const events = await Event.findAll({
    where: { date: tomorrow.toISOString().split('T')[0] },
  });
  for (const event of events) {
    const registrations = await Registration.findAll({
      where: { event_id: event.id },
      include: [User],
    });
    for (const reg of registrations) {
      const subject = `Reminder: ${event.title} On ${event.date}`;
      const text = `Hi ${reg.User.name} this is a reminder that "${event.title}" the event that you registered for is taking place on ${event.date} at ${event.time} in ${event.location}.`;
      await emailService.sendEmail(reg.User.email, subject, text);
    }
  }
  console.log('Cron job executed');
});