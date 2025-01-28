const mongoose = require('mongoose');
const skilledWorkerSchema = require('../models/skilledWorkerSchema');

// Controller functions
const skilledWorkerController = {
    // Create a skilled worker
    createSkilledWorker: async (req, res) => {
        try {
            const newWorker = new skilledWorkerSchema(req.body);

            await newWorker.save().then(() => console.log("Skilled worker created successfully!"))
            .catch((err) => console.error("Error creating skilled worker:", err));
            res.status(201).send(newWorker);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Get details of all skilled workers
    getSkilledWorker: async (req, res) => {
        try {
            const worker = await skilledWorkerSchema.findById(req.params.id);
            res.send(worker);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    // Get details of a skilled worker
    getAllSkilledWorkers: async (req, res) =>{
        try {
            const workers = await skilledWorkerSchema.find(); // This will fetch all the workers
            res.send(workers);
        } catch (error) {
            res.status(404).send(error);
        }
    },
    
    // Update details of a skilled worker
    updateSkilledWorker: async (req, res) => {
        try {
            const updatedWorker = await skilledWorkerSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            
            // Check if the worker was found and updated
            if (!updatedWorker) {
                return res.status(404).send({ message: 'Skilled worker not found' });
            }
    
            res.send(updatedWorker);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete a skilled worker
    deleteSkilledWorker: async (req, res) => {
        try {
            await skilledWorkerSchema.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

module.exports = skilledWorkerController;