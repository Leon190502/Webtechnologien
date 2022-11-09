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
  
  export const Course = ({course}) => {
  
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Footer parts={course.parts}/>
      </div>
    )
  }
