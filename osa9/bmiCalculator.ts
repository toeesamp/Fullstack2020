export {}

interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

type Bmi =
    'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III (Very severely obese)'

const calculateBmi = (height: number, weight: number): Bmi => {
    const bmiValue = (weight / ((height / 100) * (height / 100)))
    switch (true) {
        case (bmiValue < 15):
            return 'Very severely underweight';
        case (bmiValue < 16):
            return 'Severely underweight';
        case (bmiValue < 18.5):
            return 'Underweight';
        case (bmiValue < 25):
            return 'Normal (healthy weight)';
        case (bmiValue < 30):
            return 'Overweight';
        case (bmiValue < 35):
            return 'Obese Class I (Moderately obese)';
        case (bmiValue < 40):
            return 'Obese Class II (Severely obese)';
        case (bmiValue >= 40):
            return 'Obese Class III (Very severely obese)';
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}