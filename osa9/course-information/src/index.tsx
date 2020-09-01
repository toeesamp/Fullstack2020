import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];


    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts}/>
        </div>
    );
};



const Header: React.FC<{ name: string }> = ({ name }) => (
    <h1>{name}</h1>
)

interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface Course {
    courseParts: CoursePart[];
}

const Content: React.FC<Course> = (props) => (
    <>
        {props.courseParts.map((coursePart: CoursePart) =>
            <p key={coursePart.name}>
                {coursePart.name} {coursePart.exerciseCount}
            </p>
        )}
    </>
)


const Total: React.FC<Course> = (props) => (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

ReactDOM.render(<App />, document.getElementById("root"));