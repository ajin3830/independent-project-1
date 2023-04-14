import {useState} from 'react'
import {useNavigate} from "react-router-dom";

// create a new blog
function Create ({user}) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [contributor, setContributor] = useState('')
    const [progress, setProgress] = useState('Ongoing')
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    function redirectHome() {
        navigate('/')
        //console.log("Blog Added!" + user.name)
    }

    function handleSubmit(e){
        e.preventDefault()
        const blog = {title, body, contributor, progress }
        // console.log(blog)
        console.log(user.id)
        setLoading(true)

        // fetch('http://localhost:8000/blogs', {
        fetch('/blogs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log('new blog added')
            setLoading(false)
            redirectHome()
        })
    }

    return (
        <div className='create'>
            <>
                {user ?
                <>
                    <form onSubmit={handleSubmit}>
                        <label>Blog title:</label>
                        <input
                            type='text'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Blog body:</label>
                        <textarea
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <label>Blog contributor:</label>
                        <input
                            type='text'
                            required
                            value={contributor}
                            onChange={(e) => setContributor(e.target.value)}
                        />
                        <label>Blog progress:</label>
                        <select
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                        >
                            <option value='ongoing'>Ongoing</option>
                            <option value='done'>Done</option>
                        </select>
                        {!loading && <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >Add Blog</button>}
                        {loading && <button disabled>Adding blog...</button>}
                    </form>
                </>
                : 
                <h2 className='text-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-3 rounded ml-8'
                >Log in to Add a New Blog</h2>
                }
            </>
       </div> 
    )
}
export default Create;