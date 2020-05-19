import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => (
<div>{props.text} {props.value} {props.unit}</div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (!(props.good===0 && props.neutral===0 && props.bad===0)) {
    return (
      <>
      <h1>statistics</h1>
      <Display text='good' value={props.good} />
      <Display text='neutral' value={props.neutral} />
      <Display text='bad' value={props.bad} />
      <Display text='all' value={props.good+props.neutral+props.bad} />
      <Display text='average' value={(props.good - props.bad)/(props.good+props.neutral+props.bad)} />
      <Display text='positive' value={(props.good/(props.good+props.neutral+props.bad))*100} unit={'%'}/> 
    </>
    )
  }
  else return <p>No feedback given</p>
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text='good' />
      <Button handleClick={() => setToNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setToBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)