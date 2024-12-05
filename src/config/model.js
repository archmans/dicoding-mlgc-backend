const tf = require('@tensorflow/tfjs-node');
const Bucket = require('./storage');

class Model {
    async loadModel() {
        try {
            const url = await Bucket.generatedUrl();
            const model = await tf.loadGraphModel(url);
            return model;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Model();