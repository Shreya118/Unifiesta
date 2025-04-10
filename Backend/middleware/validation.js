exports.validateEvent = (req, res, next) => {
    const { title, description, category, date, time, location } = req.body;
    if (!title || !description || !category || !date || !time || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };