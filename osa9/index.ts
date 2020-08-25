import express from 'express';
import {calculateBmi} from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number(req.query.height)
        const weight = Number(req.query.weight)
        if (isNaN(height) || isNaN(weight)) {
            res.status(400).json({ error: 'malformatted parameters' })
            return;
        }
        const bmi = calculateBmi(height, weight)
        const resultObject = {
            weight: weight,
            height: height,
            bmi: bmi
        }
        res.send(resultObject);
    } catch (e) {
        res.status(400).json({ error: e })
    }
    

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});