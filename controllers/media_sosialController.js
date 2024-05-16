// mediaSosialController.js
const { media_sosial } = require('../models');

exports.getMediaSosials = async (req, res) => {
  try {
    const mediaSosials = await media_sosial.findAll();
    res.json(mediaSosials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosials' });
  }
};

exports.getMediaSosialById = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await media_sosial.findByPk(id);
    if (mediaSosial) {
      res.json(mediaSosial);
    } else {
      res.status(404).json({ message: 'Media sosial not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial' });
  }
};

exports.createMediaSosial = async (req, res) => {
  try {
    const mediaSosial = await media_sosial.create(req.body);
    res.status(201).json(mediaSosial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating media sosial' });
  }
};

exports.updateMediaSosial = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await media_sosial.findByPk(id);
    if (mediaSosial) {
      await mediaSosial.update(req.body);
      res.json(mediaSosial);
    } else {
      res.status(404).json({ message: 'Media sosial not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating media sosial' });
  }
};

exports.deleteMediaSosial = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await media_sosial.findByPk(id);
    if (mediaSosial) {
      await mediaSosial.destroy();
      res.json({ message: 'Media sosial deleted successfully' });
    } else {
      res.status(404).json({ message: 'Media sosial not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting media sosial' });
  }
};