// mediaSosialAlumniController.js
const { Media_Sosial_Alumni } = require('../models');

exports.getMediaSosialAlumnis = async (req, res) => {
  try {
    const mediaSosialAlumnis = await Media_Sosial_Alumni.findAll();
    res.json(mediaSosialAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial alumnis' });
  }
};

exports.getMediaSosialAlumniById = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
    if (mediaSosialAlumni) {
      res.json(mediaSosialAlumni);
    } else {
      res.status(404).json({ message: 'Media sosial alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial alumni' });
  }
};

exports.createMediaSosialAlumni = async (req, res) => {
  try {
    const mediaSosialAlumni = await Media_Sosial_Alumni.create(req.body);
    res.status(201).json(mediaSosialAlumni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating media sosial alumni' });
  }
};

exports.updateMediaSosialAlumni = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
    if (mediaSosialAlumni) {
      await mediaSosialAlumni.update(req.body);
      res.json(mediaSosialAlumni);
    } else {
      res.status(404).json({ message: 'Media sosial alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating media sosial alumni' });
  }
};

exports.deleteMediaSosialAlumni = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
    if (mediaSosialAlumni) {
      await mediaSosialAlumni.destroy();
      res.json({ message: 'Media sosial alumni deleted successfully' });
    } else {
      res.status(404).json({ message: 'Media sosial alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting media sosial alumni' });
  }
};

exports.getMediaSosialAlumniByAlumniId = async (req, res) => {
  try {
    const alumniId = req.params.alumniId;
    const mediaSosialAlumnis = await Media_Sosial_Alumni.findAll({ where: { Alumni_ID: alumniId } });
    res.json(mediaSosialAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial alumnis by alumni ID' });
  }
};

exports.getMediaSosialAlumniByMediaSosialId = async (req, res) => {
  try {
    const mediaSosialId = req.params.mediaSosialId;
    const mediaSosialAlumnis = await Media_Sosial_Alumni.findAll({ where: { Media_Sosial_ID: mediaSosialId } });
    res.json(mediaSosialAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving media sosial alumnis by media sosial ID' });
  }
};