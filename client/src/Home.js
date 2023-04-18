import BlogList from './BlogList'
import useFetch from './useFetch'
import ProjectList from './ProjectList'
import SearchBar from "./SearchBar"
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
    
    const [searchText, setSearchText] = useState('');
    // CAN ONLY SEARCH PROJECTS BC SEARCHING BOTH DONT WORK RIGHT
    function searchAll() {
        if (searchText.length > 0) {
            let searchedBlogs = blogs.filter((blog,)=>blog.title.toLowerCase().includes(searchText.toLowerCase()))
            let searchedProjects =projects.filter((project) =>project.title.toLowerCase().includes(searchText.toLowerCase()))
            // console.log(searchedBlogs)
            // return searchedBlogs, searchedProjects
            return searchedProjects
        } else {
            // return blogs, projects
            return projects
        }
    }
    
    function handleSearch(input) {
        setSearchText(input)
    }

    return (
        <div className="home">
            <SearchBar searchText={searchText} handleSearch={handleSearch}/>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {/* {blogs && <BlogList blogs={blogs} title='All Blogs'/>}  */}
            {blogs && <BlogList blogs={blogs} title='All Blogs'/>} 
            
            {/* <ProjectList projects={projects} title='All Projects'/> */}
            <ProjectList projects={searchAll()} title='All Projects'/> 

        </div>
    )
}

export default Home