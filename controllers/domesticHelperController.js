const mongoose = require('mongoose');
const domesticHelperSchema = require('../models/domesticHelperSchema');

// Controller functions
const domesticHelperController = {
    // Create a domestic helper
    createDomesticHelper: async (req, res) => {
        try {
            console.log(req.body)
            const newHelper = new domesticHelperSchema(req.body);
            
            await newHelper.save().then(() => console.log("Domestic helper created successfully!"))
            .catch((err) => console.error("Error creating domestic helper:", err));
            res.status(201).send(newHelper);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Get details of a domestic helper
    getDomesticHelper: async (req, res) => {
        try {
            const helper = await domesticHelperSchema.findById(req.params.id);
            
            // console.log("content ", helper.profileImage.contentType)
            // console.log("Buffer Length:", helper.profileImage.data);
            console.log("Base64 Image Data:", helper.profileImage.data.toString("base64"));
            res.send(helper);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    // Get details of all domestic helpers
    getAllDomesticHelpers: async (req, res) =>{
        try {
            const helpers = await domesticHelperSchema.find(); // This will fetch all the helpers
            res.send(helpers);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    // Update details of a doemstic helper
    updateDomesticHelper: async (req, res) => {
        try {
            console.log("BODY IS: ", req.body)
            const updatedHelper = await domesticHelperSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
            // Check if the helper was found and updated
            if (!updatedHelper) {
                return res.status(404).send({ message: 'Domestic helper not found' });
            }
    
            res.send(updatedHelper);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete a domestic helper
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