const mongoose = require('mongoose');
const skilledWorkerSchema = require('../models/skilledWorkerSchema');

// Controller functions
const skilledWorkerController = {
    createSkilledWorker: async (req, res) => {
        try {
            console.log("I am in skilled worker controller", req.body)
            const newWorker = new skilledWorkerSchema(req.body);
            await newWorker.save();
            res.status(201).send(newWorker);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getSkilledWorker: async (req, res) => {
        try {
            const worker = await skilledWorkerSchema.findById(req.params.id);
            res.send(worker);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    updateSkilledWorker: async (req, res) => {
        try {
            const updatedWorker = await skilledWorkerSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(updatedWorker);
        } catch (error) {
            res.status(400).send(error);
        }
    },

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