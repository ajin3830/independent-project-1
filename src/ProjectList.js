import {Link} from 'react-router-dom'
// function ProjectList({projects, title, handleDelete}) {
function ProjectList({projects, title}) {
    return (
        <div className='project-list'>
            <h2>{title}</h2>
            {projects.map(project => (
                <div className="project-preview" key={project.id}>
                    <Link to={`/projects/${project.id}`}>
                        <h2 className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >{project.title}</h2>
                        <p>Contributed by: {project.contributors}</p>
                        <p>Progress: {project.progress}</p>
                    </Link>
                    {/* <button onClick={() => handle Delete(project.id)}>Delete</button> */}
                </div>
            ))}
        </div>
    )
}

export default ProjectList