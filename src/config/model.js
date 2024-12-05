const tf = require('@tensorflow/tfjs-node');
const Bucket = require('./storage');

class Model {
    async loadModel() {
        try {
            const url = await Bucket.generatedUrl();
            console.log('Loading model from URL:', url);
            const model = await tf.loadGraphModel(url);
            console.log('Model loaded successfully');
            console.log(model);
            return model;
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }
}

module.exports = new Model();