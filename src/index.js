const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const PredictController = require('./modules/predict/predict.controller');

const app = express();
const PORT = process.env.PORT || 8080;

const upload = new multer({
    storage: multer.memoryStorage(),
});

app.use(bodyParser.json());
app.use(cors());

app.post('/predict', upload.single('image'), PredictController.createPrediction);
app.get('/predict/histories', PredictController.getAllPredictions);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
