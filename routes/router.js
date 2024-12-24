const express = require('express');
const router = express.Router();
const domesticHelperController = require('../controllers/domesticHelperController');
const skilledWorkerController = require('../controllers/skilledWorkerController');

// Define routes and map them to controller functions
router.get('/domesticHelpers', domesticHelperController.getAllDomesticHelpers);
router.post('/domesticHelpers', domesticHelperController.createDomesticHelper);
router.get('/domesticHelpers/:id', domesticHelperController.getDomesticHelper);
router.put('/domesticHelpers/:id', domesticHelperController.updateDomesticHelper);
router.delete('/domesticHelpers/:id', domesticHelperController.deleteDomesticHelper);

router.get('/skilledWorkers', skilledWorkerController.getAllSkilledWorkers);
router.post('/skilledWorkers', skilledWorkerController.createSkilledWorker);
router.get('/skilledWorkers/:id', skilledWorkerController.getSkilledWorker);
router.put('/skilledWorkers/:id', skilledWorkerController.updateSkilledWorker);
router.delete('/skilledWorkers/:id', skilledWorkerController.deleteSkilledWorker);

module.exports = router;