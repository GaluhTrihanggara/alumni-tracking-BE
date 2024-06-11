// scrappingDataController.js
const { scrapping_data } = require('../models');

module.exports = {
getScrappingDatas: async (req, res) => {
  try {
    const scrappingDatas = await scrapping_data.findAll();
    res.json(scrappingDatas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping datas' });
  }
},

getScrappingDataById: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingData = await scrapping_data.findByPk(id);
    if (scrappingData) {
      res.json(scrappingData);
    } else {
      res.status(404).json({ message: 'Scrapping data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving scrapping data' });
  }
},

createScrappingData: async (req, res) => {
  try {
    const scrappingData = await scrapping_data.create(req.body);
    res.status(201).json(scrappingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating scrapping data' });
  }
},

updateScrappingData: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingData = await scrapping_data.findByPk(id);
    if (scrappingData) {
      await scrappingData.update(req.body);
      res.json(scrappingData);
    } else {
      res.status(404).json({ message: 'Scrapping data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating scrapping data' });
  }
},

deleteScrappingData: async (req, res) => {
  try {
    const id = req.params.id;
    const scrappingData = await scrapping_data.findByPk(id);
    if (scrappingData) {
      await scrappingData.destroy();
      res.json({ message: 'Scrapping data deleted successfully' });
    } else {
      res.status(404).json({ message: 'Scrapping data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting scrapping data' });
  }
},
}