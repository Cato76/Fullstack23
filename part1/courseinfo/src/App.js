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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) =>{
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({parts}) =>{

  return (
  <>
   <p>{parts[0].name} Exercises:{parts[0].exercises}</p>
   <p>{parts[1].name} Exercises{parts[1].exercises}</p>
   <p>{parts[2].name} Exercises{parts[2].exercises}</p>
  </>
  )
}

const Total = ({parts}) =>{
  let i =0
  parts.forEach(element => {
      i+=element.exercises
  });
  return(
  <>
    <p>Total exercises:{i}</p>
  </>
  )
}

export default App