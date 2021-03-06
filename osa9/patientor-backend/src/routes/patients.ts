import express from 'express';
import patientService from '../services/patientService';
import {toPatient, toEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById((req.params.id).toString());
    
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient); 
        res.json(addedPatient);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        console.log('new entry', req.body);
        const newEntry = toEntry(req.body);

        const editedPatient = patientService.addEntry((req.params.id).toString(), newEntry); 
        res.json(editedPatient);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

export default router;