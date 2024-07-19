// mediaSosialController.js
const { Media_Sosial } = require('../models');

module.exports = {
getMediaSosials: async (req, res) => {
  try {
    const mediaSosials = await Media_Sosial.findAll();
    res.json(mediaSosials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosials' });
  }
},

getMediaSosialById: async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await Media_Sosial.findByPk(id);
    if (mediaSosial) {
      res.json(mediaSosial);
    } else {
      res.status(404).json({ message: 'Media sosial not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial' });
  }
},

createMediaSosial: async (req, res) => {
  try {
    const mediaSosial = await Media_Sosial.create(req.body);
    res.status(201).json(mediaSosial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating media sosial' });
  }
},

updateMediaSosial: async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await Media_Sosial.findByPk(id);
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
},

deleteMediaSosial: async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosial = await Media_Sosial.findByPk(id);
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
},
}