const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const pathToModel = `file://${path.resolve(__dirname, '../../model/model.json')}`;
// TODO: Nanti ganti ke path model yang sudah diupload ke cloud storage

class LoadModel {
    async loadModel() {
        const model = await tf.loadGraphModel(pathToModel);
        return model;
    }
}

module.exports = new LoadModel();