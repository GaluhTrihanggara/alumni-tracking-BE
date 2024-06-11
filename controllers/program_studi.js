// programStudiController.js
const { Program_Studi } = require('../models');

module.exports = {
getProgramStudis: async (req, res) => {
  try {
    const programStudis = await Program_Studi.findAll();
    res.json(programStudis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving program studis' });
  }
},

getProgramStudiById: async (req, res) => {
  try {
    const id = req.params.id;
    const programStudi = await Program_Studi.findByPk(id);
    if (programStudi) {
      res.json(programStudi);
    } else {
      res.status(404).json({ message: 'Program studi not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving program studi' });
  }
},

createProgramStudi: async (req, res) => {
  try {
    const programStudi = await Program_Studi.create(req.body);
    res.status(201).json(programStudi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating program studi' });
  }
},

updateProgramStudi: async (req, res) => {
  try {
    const id = req.params.id;
    const programStudi = await Program_Studi.findByPk(id);
    if (programStudi) {
      await programStudi.update(req.body);
      res.json(programStudi);
    } else {
      res.status(404).json({ message: 'Program studi not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating program studi' });
  }
},

deleteProgramStudi: async (req, res) => {
  try {
    const id = req.params.id;
    const programStudi = await Program_Studi.findByPk(id);
    if (programStudi) {
      await programStudi.destroy();
      res.json({ message: 'Program studi deleted successfully' });
    } else {
      res.status(404).json({ message: 'Program studi not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting program studi' });
  }
},
}