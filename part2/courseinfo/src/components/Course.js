const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <>Total of <Total parts={course.parts} /> exercises</>

        </div>
    )
}


const Header = ({ course }) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Content = ({ parts }) => {

    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Total = ({ parts }) => parts.reduce((sum, part) => sum + part.exercises, 0)

export default Course