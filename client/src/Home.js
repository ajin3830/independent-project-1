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

    // ========== useFetch for porjects?? =======================
    // const { data: projects} = useFetch(`/projects`)
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch('/projects')
        .then(res => res.json())
        .then(prevProjects => setProjects(prevProjects))
    }, [])
    
    const [searchText, setSearchText] = useState('');

    function searchProjects() {
        if (searchText.length > 0) {
            let searchedProjects =projects.filter((project) =>project.title.toLowerCase().includes(searchText.toLowerCase()))
            return searchedProjects
        } 
        return projects
    }

    function searchBlogs() {
        if (searchText.length > 0) {
            let searchedBlogs = blogs.filter((blog)=>blog.title.toLowerCase().includes(searchText.toLowerCase()))
            return searchedBlogs
        } 
        return blogs
    }
    
    function handleSearch(input) {
        setSearchText(input)
    }

    return (
        <div className="home">
            <SearchBar 
            searchText={searchText} 
            handleSearch={handleSearch}
            />
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {/* {blogs && <BlogList blogs={blogs} title='All Blogs'/>}  */}
            {blogs && <BlogList blogs={searchBlogs()} title='All Blogs'/>} 
            
            {/* <ProjectList projects={projects} title='All Projects'/> */}
            <ProjectList projects={searchProjects()} title='All Projects'/> 

        </div>
    )
}

export default Home