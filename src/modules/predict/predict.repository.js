const dbInstance = require('../../config/database');

class PredictRepository {
    constructor() {
        this.db = dbInstance.getFirestore();
    }

    async savePrediction(predictionData) {
        console.log('Saving prediction...');
        const { id, result, suggestion, createdAt } = predictionData;
        const docRef = this.db.collection('predictions').doc(id);
    
        try {
            await docRef.set({ id, result, suggestion, createdAt });
            console.log(`Prediction saved with ID: ${id}`);
        } catch (error) {
            console.error('Error saving prediction:', error);
            throw error;
        }
    }

    async getAllPredictions() {
        const snapshot = await this.db.collection('predictions').get();
        const predictions = [];
    
        snapshot.forEach(doc => {
            predictions.push(doc.data());
        });
    
        return predictions;
    }
}

module.exports = new PredictRepository();