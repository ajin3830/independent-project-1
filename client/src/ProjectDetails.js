import {useParams, useNavigate} from 'react-router-dom'
import useFetch from './useFetch'
import {useContext, useEffect, useState} from 'react'
import { UserContext } from './UserContext'
import EditProjectDetail from './EditProjectDetail'
import {AiFillLinkedin, AiFillYoutube} from 'react-icons/ai';


function ProjectDetails () {
    const {user} = useContext(UserContext)
    // const [progress, setProgress] = useState('Ongoing')

    const {id} =useParams()
    // const {data:project, error, loading} = useFetch(`http://localhost:8000/projects/${id}`)
    const {data:project, error, loading} = useFetch(`/projects/${id}`)

    let navigate = useNavigate() 
    
    function redirectHome() {
        navigate('/')
    }

    function handleDelete () {
        fetch(`/projects/${project.id}`, {
            method:'DELETE'
        })
        .then(redirectHome())
    }
    
    const [clickEdit, setClickEdit] = useState(false)
    function handleEditClick () {
        setClickEdit(true)
    }

    return (
       <div className='project-details'>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {project && (
            <>
                {/* <article> */}
                {clickEdit ? 
                    <>
                        <EditProjectDetail 
                            project={project}
                            redirectHome={redirectHome}/>
                    </> 
                    : 
                    <>
                        <article>
                            <h2>Title: {project.title}</h2>
                            <p>Date: {project.date}</p>
                            <p>Description: {project.description}</p> 
                            <p>Image: {project.image}</p>
                            <p>Link: {project.link}</p>
                            <p>Contributed by: {project.contributors}</p>
                            <p>Progress: {project.progress}</p> 
                        </article>
                        <AiFillLinkedin className='text-2xl'/>
                        <AiFillYoutube className='text-2xl'/>
                    </>}
                    {/* {user && project.contributors.toLowerCase().includes(user.username.toLowerCase()) ?  */}
                    {user && project.contributors.split(',').filter( contributor => contributor === user.username).toString().trim() ? 
                        <>
                            {clickEdit ? 
                                <></>
                                : 
                                <>
                                    <button 
                                        type="button"
                                        onClick={handleEditClick}
                                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                                    >Edit</button>

                                    <button 
                                        type="button"
                                        onClick={handleDelete}
                                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                                    >Delete</button>
                                </>}
                        </> : ''}
                {/* </article> */}
            </>
         )} 
       </div> 
    )
}

export default ProjectDetails;