import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
    const courseName = "Half Stack application development";

    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "Useless garbage",
            exerciseCount: 9001,
            description: "this is useless"
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};



const Header: React.FC<{ name: string }> = ({ name }) => (
    <h1>{name}</h1>
)

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Content: React.FC<Course> = (props) => (
        <>
            {props.courseParts.map((part: CoursePart) => {
                switch (part.name) {
                    case "Fundamentals":
                        return <Part
                            key={part.name}
                            name={part.name}
                            exerciseCount={part.exerciseCount}
                            description={part.description}
                        />
                    case "Using props to pass data":
                        return <Part
                            key={part.name}
                            name={part.name}
                            exerciseCount={part.exerciseCount}
                            groupProjectCount={part.groupProjectCount}
                        />
                    case "Deeper type usage":
                        return <Part
                            key={part.name}
                            name={part.name}
                            exerciseCount={part.exerciseCount}
                            description={part.description}
                            exerciseSubmissionLink={part.exerciseSubmissionLink}
                        />
                    case "Useless garbage":
                        return <Part
                            key={part.name}
                            name={part.name}
                            exerciseCount={part.exerciseCount}
                            description={part.description}
                        />
                    default:
                        return assertNever(part);
                }
            })
            }
        </>
    )


const Part: React.FC<CoursePart> = (props) => {
    //this is wrong but it works
    switch (props.name) {
        case "Fundamentals":
            return <>
                <h3>{props.name}</h3>
                <p>exerciseCount {props.exerciseCount}</p>
                <p>description {props.description}</p>
            </>
        case "Using props to pass data":
            return <>
                <h3>{props.name}</h3>
                <p>exerciseCount {props.exerciseCount}</p>
                <p>groupProjectCount {props.groupProjectCount}</p>
            </>
        case "Deeper type usage":
            return <>
                <h3>{props.name}</h3>
                <p>exerciseCount {props.exerciseCount}</p>
                <p>description {props.description}</p>
                <p>exerciseSubmissionLink {props.exerciseSubmissionLink}</p>
            </>
        case "Useless garbage":
            return <>
                <h3>{props.name}</h3>
                <p>exerciseCount {props.exerciseCount}</p>
                <p>description {props.description}</p>
            </>
        default:
            return assertNever(props);
    }
}



const Total: React.FC<Course> = (props) => (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | UselessCoursePart;

interface Course {
    courseParts: CoursePart[];
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}


interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
}

interface UselessCoursePart extends CoursePartWithDescription {
    name: "Useless garbage";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}


ReactDOM.render(<App />, document.getElementById("root"));