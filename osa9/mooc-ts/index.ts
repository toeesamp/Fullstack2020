import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { ExcerciseResults, calculateExcerciseResults } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) {
            res.status(400).json({ error: 'malformatted parameters' });
            return;
        }
        const bmi = calculateBmi(height, weight);
        const resultObject = {
            weight: weight,
            height: height,
            bmi: bmi
        };
        res.send(resultObject);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e });
        }
        else {
            throw e;
        }
    }
});

interface ExcerciseRequestObject {
    daily_exercises: Array<number>;
    target: number;
}

app.post('/exercises', (req, res) => {
    try {
        const requestData: ExcerciseRequestObject = req.body as ExcerciseRequestObject;
        if (!requestData.target || !requestData.daily_exercises) {
            res.status(400).json({ error: 'parameters missing' });
            return;
        }
        if (typeof requestData.target != "number" || requestData.daily_exercises.map(exercise => typeof exercise === "number").includes(false)) {
            res.status(400).json({ error: 'malformatted parameters' });
            return;
        }
        console.log('requestData target', requestData.target);
        console.log('requestData daily_excercises', requestData.daily_exercises);
        const result: ExcerciseResults = calculateExcerciseResults(requestData.target, requestData.daily_exercises);
        res.send(result);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ error: e });
        }
        else {
            throw e;
        }
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});