class Bucket {
    async generatedUrl() {
        const url = `https://storage.googleapis.com/prediction-bucket-salman/submissions-model/model.json`;
        return url;
    }
}

module.exports = new Bucket();