/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Diagnosis, NewPatient, Gender, Entry, NewEntry, NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, HealthCheckRating } from './types';

export const toPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
    return newPatient;
};

export const toEntry = (object: any): NewEntry => {
    const entryType = parseEntryType(object.type);
    // let newEntry;
    switch (entryType) {
        case "Hospital":
            const hospitalEntry: NewHospitalEntry = {
                type: entryType,
                discharge: parseDischarge(object.discharge),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                //TODO optional?
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            };
            return hospitalEntry;
        case "OccupationalHealthcare":
            const occupationalEntry: NewOccupationalHealthcareEntry = {
                type: entryType,
                employerName: parseName(object.employerName),
                //TODO optional?
                sickLeave: parseSickLeave(object.sickLeave),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                //TODO optional?
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            };
            return occupationalEntry;
        case "HealthCheck":
            const healtcheckEntry: NewHealthCheckEntry = {
                type: entryType,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                //TODO optional?
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            };
            return healtcheckEntry;
        default:
            throw new Error('Incorrect or missing entryType: ' + entryType);
    }
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntryType = (entryType: any): string => {
    if (!entryType || !isString(entryType)) {
        throw new Error('Incorrect or missing entryType: ' + entryType);
    }
    return entryType;
};

//FIXME?
const parseEntries = (_entries: any): Entry[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const temp: Entry[] = [];
    return temp;
};

const parseDischarge = (discharge: any): NewHospitalEntry["discharge"] => {
    if (!discharge || !isString(discharge.criteria || !isDate(discharge.date))) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseSickLeave = (sickLeave: any): NewOccupationalHealthcareEntry["sickLeave"] => {
    if (!sickLeave || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): number => {
    if (!healthCheckRating || !isHealtCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
    if (!diagnosisCodes || !isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
    }
    const diagnosisArray: Array<Diagnosis['code']> = [];
    diagnosisCodes.map((d: Diagnosis['code']) =>
        diagnosisArray.push(d)
    );
    return diagnosisCodes;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isHealtCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isArray = (array: any): array is Array<string> => {
    return array instanceof Array;
};

// const isEntryType = (entry: any): entry is Entry => {
//     return Object.values(Entry).includes(entry);
// };