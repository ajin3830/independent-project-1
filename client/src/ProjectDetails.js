import {useParams, useNavigate} from 'react-router-dom'
import useFetch from './useFetch'

function ProjectDetails ({user, editProject, setEditProject}) {
    const {id} =useParams()
    // const {data:project, error, loading} = useFetch(`http://localhost:8000/projects/${id}`)
    const {data:project, error, loading} = useFetch(`/projects/${id}`)
    let navigate = useNavigate() 
    
    function redirectHome() {
        navigate('/')
    }
    function redirectAccount() {
        navigate('/account')
    }

    // click on edit button, edit button changes to save and cancel, 
    // after save or cancel, redirect to show edited + all projects
    // function handlePatch () {
    //     const edit = {edit title, edit body, filter author}
    //     fetch(`http://localhost:8000/projects/${project.id}`, {
    //         method:'PATCH',
    //         headers:{'Content-Type': 'application/json'},
    //         body: JSON.stringify(edit)
    //     })
    //     .then(r => r.json())
    //     .then(data => {
    //         setEditProject(data)
    //         redirectHome()
    //     })
    // }
    
    function handleDelete () {
        fetch(`/projects/${project.id}`, {
            method:'DELETE'
        })
        .then(redirectHome())
    }
    
    return (
       <div className='project-details'>
        {/* <h2>Project details: {id}</h2> */}
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {project && (
            <article>
                <h2 className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >{project.title}</h2>
                <p>Progress: {project.progress}</p>
                <p>Contributed by: {project.contributors}</p>
                <div>{project.body}</div>
                <p>Date: {project.date}</p>
                <p>Description: {project.description}</p> 
                <p>Image: {project.image}</p>
                <p>Link: {project.link}</p>

                {user && project.contributors.toLowerCase().includes(user.username.toLowerCase()) ? (
                    <>
                        <button 
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                            // onClick={handlePatch}
                        >Edit</button>
                        <button 
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                            onClick={handleDelete}
                        >Delete</button>
                    </>
                ):( ''
                )}
            </article>
        )}
       </div> 
    )
}
export default ProjectDetails;