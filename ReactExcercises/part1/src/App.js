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
      <Header courseProp={course.name}/>
      <Content partsProp={course.parts}/>
      <Total  partsProp={course.parts}/>
    </div>
  )
}

export default App


//---------------------------------Components-----------------------//
const Header = (props) => {

  return(
    <div>
      <h1>{props.courseProp}</h1>
    </div>
  )

}

const Content = (props) => {

  return(
    <div>
      <Part part={props.partsProp[0]}/>
      <Part part={props.partsProp[1]}/>
      <Part part={props.partsProp[2]}/>
    </div>
  )
}

const Part = (props) => {

  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = (props) => {

  return(
    <div>
      <p>Number of exercises {props.partsProp[1 -1].exercises + props.partsProp[2 -1].exercises + props.partsProp[3-1].exercises}</p>
    </div>
  )
}

/*++++++++++++++++++Wichtig++++++++++++++++++++++++++++++
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed*/


