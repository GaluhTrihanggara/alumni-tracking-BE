// feedbackController.js
const { feedback } = require('../models');

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving feedbacks' });
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await feedback.findByPk(id);
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving feedback' });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating feedback' });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await feedback.findByPk(id);
    if (feedback) {
      await feedback.update(req.body);
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating feedback' });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await feedback.findByPk(id);
    if (feedback) {
      await feedback.destroy();
      res.json({ message: 'Feedback deleted successfully' });
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting feedback' });
  }
};

exports.getFeedbackByAlumniId = async (req, res) => {
  try {
    const alumniId = req.params.alumniId;
    const feedbacks = await feedback.findAll({ where: { Alumni_ID: alumniId } });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving feedbacks by alumni ID' });
  }
};