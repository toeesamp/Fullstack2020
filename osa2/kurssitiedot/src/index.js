import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map((course, i) =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const Header = (props) => {
  console.log("Headerin propsit")
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = ({parts}) => {
  console.log("Contentin propsit")
  console.log(parts)
  return (
    <>
      <ul>
        {parts.map((part, i) =>
          <Part key={part.id} part={part} />
        )}
      </ul>
    </>
  )
}

const Part = (props) => {
  console.log("Partin propsit")
  console.log(props)
  return (
    <li>
      {props.part.name} {props.part.exercises}
    </li>
  )
}

const Total = (props) => {
  console.log("Totalin propsit")
  console.log(props)
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>total of {total} excercises</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))