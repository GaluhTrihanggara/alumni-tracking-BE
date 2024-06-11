// scrappingHistoryController.js
const { scrapping_history } = require('../models');

module.exports = {
getScrappingHistories: async (req, res) => {
  try {
    const scrappingHistories = await scrapping_history.findAll();
    res.json(scrappingHistories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping histories' });
  }
},

getScrappingHistoryById: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingHistory = await scrapping_history.findByPk(id);
    if (scrappingHistory) {
      res.json(scrappingHistory);
    } else {
      res.status(404).json({ message: 'Scrapping history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping history' });
  }
},

createScrappingHistory: async (req, res) => {
  try {
    const scrappingHistory = await scrapping_history.create(req.body);
    res.status(201).json(scrappingHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating scrapping history' });
  }
},

updateScrappingHistory: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingHistory = await scrapping_history.findByPk(id);
    if (scrappingHistory) {
      await scrappingHistory.update(req.body);
      res.json(scrappingHistory);
    } else {
      res.status(404).json({ message: 'Scrapping history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating scrapping history' });
  }
},

deleteScrappingHistory: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingHistory = await scrapping_history.findByPk(id);
    if (scrappingHistory) {
      await scrappingHistory.destroy();
      res.json({ message: 'Scrapping history deleted successfully' });
    } else {
      res.status(404).json({ message: 'Scrapping history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting scrapping history' });
  }
},
}