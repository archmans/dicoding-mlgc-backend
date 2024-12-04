const PredictRepository = require('./predict.repository');
const crypto = require('crypto');
const tf = require('@tensorflow/tfjs-node');

class PredictService {
    async predict(imageBuffer, model) {
        const imageTensor = tf.node
        .decodeJpeg(imageBuffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        
        const predictions = await model.predict(imageTensor).data();
        const result = predictions[0] > 0.5 ? 'Cancer' : 'Non-cancer';
        const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';

        return {
            id: this.generateId(),
            result,
            suggestion,
            createdAt: new Date().toISOString(),
        };
    }

    generateId() {
        return crypto.randomUUID();
    }

    async savePrediction(predictionData) {
        await PredictRepository.savePrediction(predictionData);
    }

    async findAllPredictions() {
        return await PredictRepository.getAllPredictions();
    }
}

module.exports = new PredictService();
