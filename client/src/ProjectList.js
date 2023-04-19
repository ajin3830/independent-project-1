import {Link} from 'react-router-dom'

function ProjectList({projects, title}) {
    return (
        <div className='project-list font-normal md:font-bold'>
            <h2>{title}</h2>
            {projects.map(project => (
                <div className="project-preview text-center shadow-lg p-10 rounded-xl my-10" key={project.id}>
                    <Link to={`/projects/${project.id}`}>
                        <h2 className="text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center mr-2 mb-2"
                        >{project.title}</h2>
                        <p>Contributed by: {project.contributors}</p>
                        <p>Description: {project.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ProjectList