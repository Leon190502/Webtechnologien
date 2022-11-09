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


const Footer = ({parts}) => {
  
  let total = parts.reduce((total,current)=>total+current.exercises,0);

  return(
    <div>
      <h4>Number of exercises {total}</h4>
    </div>
  )
}

const Course = ({course}) => {

  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )
}


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
    <div>
      {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
    </div>

  )
}

export default App