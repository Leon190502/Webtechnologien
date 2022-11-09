const Header = ({name}) => {
  return(
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      <ul>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </ul>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Footer = ({total}) => {
  return(
    <div>
      <h3>Total of {total} Exercises</h3>
    </div>
  )
}

const Course = ({course}) => {
  let total = 0;
  for(let i = 0, n = course.parts.length; i<n; i++){
    total = total + course.parts[i].exercises
  }
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Footer total={total}/>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      }
    ]
  }
  return <Course course={course}/>
}

export default App