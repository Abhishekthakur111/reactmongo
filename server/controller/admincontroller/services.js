const Services = require('../../models/services');
const Category = require('../../models/categeory'); 
const { Validator } = require('node-input-validator');
const helper = require('../../helper/helper');

module.exports = {
    createService: async (req, res) => {
        try {
            const v = new Validator(req.body, {
                name: "required|string",
                price: "numeric",
                image: "string",
                cat_id: "string"
            });

            let errorsResponse = await helper.checkValidation(v);
            if (errorsResponse) {
                return helper.error(res, errorsResponse);
            }

            if (req.files && req.files.image) {
                let images = await helper.fileUpload(req.files.image);
                req.body.image = images;
            }

            const newService = await Services.create({
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                cat_id: req.body.cat_id,
            });

            return helper.success(res, "Service Created Successfully", { data: newService });
        } catch (error) {
            console.error("Error creating service:", error);
            return helper.error(res, "Internal server error");
        }
    },

    servicelist: async (req, res) => {
        try {
            const services = await Services.find()
                .populate('cat_id', 'name')
                .exec();

                res.status(200).json({
                    success: true,
                    message: "Services retrieved successfully",
                    body: services});
        } catch (error) {
            console.error("Error retrieving services:", error);
            return helper.error(res, "Internal server error");
        }
    },

    serviceView: async (req, res) => {
        try {
            const service = await Services.findById(req.params._id)
                .populate('cat_id')
                .exec();
                res.status(200).json({
                    success: true,
                    message: "Services retrieved successfully",
                    body: service});
            
        } catch (error) {
            console.error("Error retrieving service details:", error);
            return helper.error(res, "Internal server error");
        }
    },

    

    deleteService: async (req, res) => {
        try {
            const { _id } = req.params;
            
            const deletedService = await Services.findByIdAndDelete(_id);


            if (!deletedService) {
                return helper.error(res, "Service not found");
            }

            return helper.success(res, "Service deleted successfully");
        } catch (error) {
            console.error("Error deleting service:", error);
            return helper.error(res, "Internal server error");
        }
    },
    status: async (req, res) => {
        try {
            const { id, status } = req.body;
    
            if (status !== "0" && status !== "1") {
                return res.status(400).json({ message: "Invalid status value" });
            }
    
       
            const updatedService = await Services.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
    
     
            if (!updatedService) {
                return res.status(404).json({ message: "Service not found" });
            }
    
       
            return res.status(200).json({
                success: true,
                message: "Service status updated successfully",
                data: updatedService
            });
        } catch (error) {
            console.error("Error updating service status:", error);
            return res.status(500).json({ message: "An error occurred while updating service status" });
        }
    },
    
    
};
