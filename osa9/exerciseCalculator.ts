interface ExcerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean | undefined;
    rating: number | undefined;
    ratingDescription: string | undefined;
    target: number;
    average: number;
}

interface ExcerciseArguments {
    target: number;
    trainingDays: Array<number>;
}

const parseArguments = (args: Array<string>): ExcerciseArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (!args.slice(2).every(arg => isNaN(Number(arg)))) {
        return {
            target: Number(args[2]),
            trainingDays: args.slice(3).map(a => parseFloat(a))
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExcerciseResults = (target: number, trainingDaysArray: Array<number>): ExcerciseResults => {
    const periodLength = trainingDaysArray.length;
    const trainingDays = trainingDaysArray.filter(day => day > 0).length;
    const average = trainingDaysArray.reduce((a, b) => a + b, 0) / periodLength;
    const successValue = average - target;
    let success;
    let rating;
    let ratingDescription;
    switch (true) {
        case successValue < 0:
            rating = 1;
            ratingDescription = 'try harder';
            success = false;
            break;
        case successValue == 0:
            rating = 2;
            ratingDescription = 'not bad'
            success = true;
            break;
        case successValue > 0:
            rating = 3;
            ratingDescription = 'well done'
            success = true;
            break;
        default:
            rating = undefined;
            ratingDescription = undefined
            success = undefined;
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        target: target,
        average: average,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription
    };
}

try {
    const { target, trainingDays } = parseArguments(process.argv);
    console.log(calculateExcerciseResults(target, trainingDays));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}