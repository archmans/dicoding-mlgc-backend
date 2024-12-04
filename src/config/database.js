const Firestore = require('@google-cloud/firestore');

class Database {
    constructor() {
        this.firestore = new Firestore({
            projectId: 'submissionmlgc-muhamadsalman',
            keyFilename: './serviceKey.json',
        });
    }

    getFirestore() {
        return this.firestore;
    }
}

module.exports = new Database();