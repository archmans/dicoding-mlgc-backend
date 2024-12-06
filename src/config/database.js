const Firestore = require('@google-cloud/firestore');
const path = require('path');
const pathKey = path.resolve('./serviceKey.json');

class Database {
    constructor() {
        this.firestore = new Firestore({
            projectId: 'submissionmlgc-muhamadsalman',
            keyFilename: pathKey,
        });
    }

    getFirestore() {
        return this.firestore;
    }
}

module.exports = new Database();