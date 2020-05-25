import React from 'react'

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

export default Course