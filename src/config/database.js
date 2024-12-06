const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const Firestore = require('@google-cloud/firestore');

class Database {
    constructor() {
        this.firestore = null;
    }

    async init() {
        const secretClient = new SecretManagerServiceClient();
        const [version] = await secretClient.accessSecretVersion({
            name: 'projects/49760651936/secrets/serviceAccount/versions/latest',
        });

        const serviceKey = version.payload.data.toString('utf8');

        this.firestore = new Firestore({
            projectId: 'submissionmlgc-muhamadsalman',
            credentials: JSON.parse(serviceKey),
        });
    }

    getFirestore() {
        return this.firestore;
    }
}

const database = new Database();
database.init().then(() => {
    console.log('Firestore initialized');
}).catch(err => {
    console.error('Error initializing Firestore:', err);
});

module.exports = database;
