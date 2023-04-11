import BlogList from './BlogList'
import useFetch from './useFetch'
import ProjectList from './ProjectList'
import {useState, useEffect} from 'react'

function Home () {
    // function handleClick (e) {
    //     console.log('click', e)
    // }
    // const handleClickAgain = (name, e) => {
    //     console.log('hello ' + name, e.target)
    // }
    
    // function handleDelete(id) {
        //     const newBlogs = blogs.filter(blog => blog.id !== id)
        //     setBlogs(newBlogs)
        // }

    // useEffect(()=> {
    //     console.log('this runs at every render when any state changes')
    // })
    // // with an empty dependency array
    // useEffect(()=> {
    //     console.log('this runs only once at initial render')
    // }, [])
    // // with state inside dependency array
    // const  [name, setName] = useState('mario')
    // useEffect(()=> {
    //     console.log('this runs at initial render and everytime state of name changes ')
    // }, [name])

    // const { data: blogs, loading, error} = useFetch(`http://localhost:8000/blogs`)
    const { data: blogs, loading, error} = useFetch(`/blogs`)

    // const [user, setUser] = useState(null);

    // ========== Can i use useFetch=======================
    // const { data: projects, loading, error} = useFetch(`http://localhost:5555/projects`)
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch('/projects')
        .then(res => res.json())
        .then(prevProjects => setProjects(prevProjects))
    }, [])

    // function handlePostProj(newProject) {
    //     setProjects([...projects, newProject])
    // }
    // ========== Can i use useFetch()=======================


    
    // // user remains logged in
    // useEffect(() => {
    //     fetch("/check_session").then((r) => {
    //     if (r.ok) {
    //         r.json().then((user) => {
    //         setUser(user)
    //         });
    //     }
    //     });
    // }, []);
    
    // function handleLogout() {
    //     setUser(null)
    // }

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title='All Blogs'/>} 
            
            <ProjectList projects={projects} title='All Projects'/>          
            {/* <BlogList blogs={blogs} title='All Blogs' handleDelete={handleDelete}/>  */}
            {/* <button onClick={() => setName('luigi')}>Change name</button>
            <p>{name}</p> */}

            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario' )} title="Mario's Blogs"/> */}
            
            {/* <button onClick={handleClick}>Click me</button> */}
            {/* <button onClick={(e) => handleClickAgain('aj', e)}>Click me again</button> */}
        </div>
    )
}

export default Home