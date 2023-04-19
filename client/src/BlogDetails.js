import {useParams, useNavigate} from 'react-router-dom'
import useFetch from './useFetch'
import {useContext, useEffect, useState} from 'react'
import { UserContext } from './UserContext'

function BlogDetails () {
    const {user} = useContext(UserContext)

    const {id} =useParams()

    const {data:blog, error, loading} = useFetch(`/blogs/${id}`)
    // const {data:blog, error, loading} = useFetch(`http://localhost:8000/blogs/${id}`)

    let navigate = useNavigate() 

    function redirectHome() {
        navigate('/')
    }
    function redirectAccount() {
        navigate('/account')
    }

    const [clickEdit, setClickEdit] = useState(false)
    function handleEditClick () {
        setClickEdit(true)
    }

    function handleDelete () {
        fetch(`/blogs/${blog.id}`, {
            method:'DELETE'
        })
        .then(redirectHome())
    }
    return (
       <div className='blog-details'>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {blog && (
            <article>
                <h2 className='font-normal md:font-bold'>{blog.title}</h2>
                <p>Progress: {blog.progress}</p>
                <p>Contributed by: {blog.contributor}</p>
                <div>{blog.body}</div>
                {user && blog.contributor.localeCompare(user.username) === 0 ?
                    <>
                        <button 
                            className="text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                            onClick={handleEditClick}
                        >Edit</button>
                        <button 
                            className="text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                            onClick={handleDelete}
                        >Delete</button>

                    </>
                    :
                    <>
                    </>
                }
            </article>
        )}

       </div> 
    )
}
export default BlogDetails;