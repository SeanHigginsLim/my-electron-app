const mongoose = require('mongoose');
const domesticHelperSchema = require('../models/domesticHelperSchema');

// Controller functions
const domesticHelperController = {
    createDomesticHelper: async (req, res) => {
        try {
            console.log("I am in domestic helper controller", req.body)
            const newHelper = new domesticHelperSchema(req.body);
            await newHelper.save().then(() => console.log("Domestic helper created successfully!"))
            .catch((err) => console.error("Error creating domestic helper:", err));
            res.status(201).send(newHelper);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getDomesticHelper: async (req, res) => {
        try {
            const helper = await domesticHelperSchema.findById(req.params.id);
            res.send(helper);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    getAllDomesticHelpers: async (req, res) =>{
        try {
            const helpers = await domesticHelperSchema.find(); // This will fetch all the helpers
            res.send(helpers);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    updateDomesticHelper: async (req, res) => {
        try {
            const updatedHelper = await domesticHelperSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(updatedHelper);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    deleteDomesticHelper: async (req, res) => {
        try {
            await domesticHelperSchema.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

module.exports = domesticHelperController;