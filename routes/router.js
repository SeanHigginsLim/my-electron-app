const express = require('express');
const router = express.Router();
const domesticHelperController = require('../controllers/domesticHelperController');
const skilledWorkerController = require('../controllers/skilledWorkerController');

// Define routes and map them to controller functions
router.post('/domesticHelpers', domesticHelperController.createDomesticHelper);
router.get('/domesticHelpers/:id', domesticHelperController.getDomesticHelper);
router.put('/domesticHelpers/:id', domesticHelperController.updateDomesticHelper);
router.delete('/domesticHelpers/:id', domesticHelperController.deleteDomesticHelper);
router.post('/skilledWorkers', skilledWorkerController.createSkilledWorker);
router.get('/skilledWorkers/:id', skilledWorkerController.getSkilledWorker);
router.put('/skilledWorkers/:id', skilledWorkerController.updateSkilledWorker);
router.delete('/skilledWorkers/:id', skilledWorkerController.deleteSkilledWorker);

// // Add Profile
// router.post('/', (req, res) => {
//   const profileData = req.body;
//   const profile = new Profile(profileData);
//   profile.save()
//     .then(savedProfile => res.status(201).json(savedProfile))
//     .catch(err => res.status(400).json(err));
// });

// // Update Profile
// router.put('/:id', (req, res) => {
//   const profileId = req.params.id;
//   const updatedData = req.body;
//   Profile.findByIdAndUpdate(profileId, updatedData, { new: true })
//     .then(updatedProfile => res.status(200).json(updatedProfile))
//     .catch(err => res.status(400).json(err));
// });

// // Delete Profile
// router.delete('/:id', (req, res) => {
//   const profileId = req.params.id;
//   Profile.findByIdAndDelete(profileId)
//     .then(() => res.status(204).send())
//     .catch(err => res.status(400).json(err));
// });

module.exports = router;
