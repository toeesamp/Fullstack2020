import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatientData, NewPatient } from '../types';

// const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newID: string = uuidv4();
    const newPatient = {
        id: newID,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient
};