import {useParams, useNavigate} from 'react-router-dom'
import useFetch from './useFetch'

function BlogDetails ({user, editBlog, setEditBlog}) {
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
    // click on edit button, edit button changes to save and cancel, 
    // after save or cancel, redirect to show edited + all blogs
    // function handlePatch () {
    //     const edit = {edit title, edit body, filter author}
    //     fetch(`http://localhost:8000/blogs/${blog.id}`, {
    //         method:'PATCH',
    //         headers:{'Content-Type': 'application/json'},
    //         body: JSON.stringify(edit)
    //     })
    //     .then(r => r.json())
    //     .then(data => {
    //         setEditBlog(data)
    //         redirectHome()
    //     })
    // }
    
    function handleDelete () {
        fetch(`/blogs/${blog.id}`, {
            method:'DELETE'
        })
        .then(redirectHome())
    }
    return (
       <div className='blog-details'>
        {/* <h2>Blog details: {id}</h2> */}
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {blog && (
            <article>
                <h2 className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >{blog.title}</h2>
                <p>Progress: {blog.progress}</p>
                <p>Contributed by: {blog.contributor}</p>
                <div>{blog.body}</div>
                {user? 
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
                    :
                <>
                    <button 
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                        onClick={redirectAccount}
                    >Edit</button>
                    <button 
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                        onClick={redirectAccount}
                    >Delete</button>
                </>
                }
            </article>
        )}

       </div> 
    )
}
export default BlogDetails;