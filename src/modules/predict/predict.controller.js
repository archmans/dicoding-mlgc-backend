const PredictService = require('./predict.service');
const Model = require('../../config/model');

let modelInstance;

class PredictController {
    async createPrediction(req, res) {
        try {
            if (req.file.size > 1 * 1024 * 1024) {
                return res.status(413).json({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000',
                });
            }
            modelInstance = await Model.loadModel();
            const predictionData = await PredictService.predict(req.file.buffer, modelInstance);
            await PredictService.savePrediction(predictionData);
            res.status(201).json({
                status: 'success',
                message: 'Model is predicted successfully',
                data: predictionData,
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            });
        }
    }    

    async getAllPredictions(req, res) {
        try {
            const predictions = await PredictService.findAllPredictions();
            res.status(200).json({
                status: 'success',
                data: predictions,
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: 'Terjadi kesalahan dalam mengambil data prediksi',
            });
        }
    }
}

module.exports = new PredictController();
