const Content = (props) => {
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <Content name={course.parts[0].name} number={course.parts[0].exercises} />
      <Content name={course.parts[1].name} number={course.parts[1].exercises} />
      <Content name={course.parts[2].name} number={course.parts[2].exercises} />
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    </div>
  )
}

export default App