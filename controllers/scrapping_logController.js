// scrappingLogController.js
const { scrapping_log } = require('../models');

module.exports = {
getScrappingLogs: async (req, res) => {
  try {
    const scrappingLogs = await scrapping_log.findAll();
    res.json(scrappingLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping logs' });
  }
},

getScrappingLogById: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingLog = await scrapping_log.findByPk(id);
    if (scrappingLog) {
      res.json(scrappingLog);
    } else {
      res.status(404).json({ message: 'Scrapping log not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping log' });
  }
},

createScrappingLog: async (req, res) => {
  try {
    const scrappingLog = await scrapping_log.create(req.body);
    res.status(201).json(scrappingLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating scrapping log' });
  }
},

updateScrappingLog: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingLog = await scrapping_log.findByPk(id);
    if (scrappingLog) {
      await scrappingLog.update(req.body);
      res.json(scrappingLog);
    } else {
      res.status(404).json({ message: 'Scrapping log not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating scrapping log' });
  }
},

deleteScrappingLog: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingLog = await scrapping_log.findByPk(id);
    if (scrappingLog) {
      await scrappingLog.destroy();
      res.json({ message: 'Scrapping log deleted successfully' });
    } else {
      res.status(404).json({ message: 'Scrapping log not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting scrapping log' });
  }
},
}