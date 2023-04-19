import {useState} from 'react'
import {useNavigate} from "react-router-dom";

// create a new project
function Project({user}) {

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState('Ongoing')

    let navigate = useNavigate()
    
    function redirectHome() {
        navigate('/')
    }
    
    const initialValues = {
        title: "", 
        date: "", 
        description: "", 
        image: "", 
        link: "",
        contributors: "",
    }
    const [projectData, setProjectData] = useState(initialValues)

  function handleInput(e) {
    const value = e.target.value
    const name = e.target.name

    setProjectData({...projectData, [name]:value})
    // setProjectData({[name]:value, ...projectData})
  }

  function handleSubmit(e) {
    e.preventDefault()
    // if contributor 
    const contributorArray = projectData.contributors.split(',')
    const newContributorArray = contributorArray.map(contributor => {
      // console.log(contributor)
      if (contributor.trim().length < 5) {
        // contributor + random number
        window.alert(`contributor ${contributor} modified to ${contributor}12345 as username for its new account, plz write down this temp password: ${contributor}4Password`)
        return `${contributor}12345`
      } 
      return contributor
      
    })
    // console.log(newContributorArray)
    const validContributors = newContributorArray.toString()
    

    const newProject = {
      title: projectData.title,
      date: projectData.date,
      description: projectData.description,
      image: projectData.image,
      link: projectData.link,
      contributors: validContributors,
      progress: progress
    }
    setLoading(true)

    // fetch('http://localhost:8000/projects', {
    fetch('/projects', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newProject)
    })
    .then(res => {
      // console.log(res)
      if (res.status === 201) {
        res.json()
        .then((data) => {
          // console.log(data.contributors)
          window.alert(`New project added` )
          setLoading(false)
          redirectHome()
      })
      } else if (res.status === 400) {
        res.json()
        .then(
          (error) => {
            window.alert(error['message'])
          })
        // then clear contributors input or jsut the whole form
      }
    })
  }  
  
  return (
    <div className="new-project-form">
      {user ?
        <>
            <form onSubmit={handleSubmit} className='font-normal md:font-bold'>

                <label>Project Title: </label>
                <input
                  id="title"
                  required
                  type="text"
                  name="title"
                  value={projectData.title}
                  placeholder=""
                  onChange={handleInput}
                />

                <label>Project Date: </label>
                <input
                  id="date"
                  required
                  type="text"
                  name="date"
                  value={projectData.date}
                  placeholder=""
                  onChange={handleInput}
                />

                <label>Project Description: </label>
                <textarea
                  id="description"
                  required
                  name="description"
                  value={projectData.description}
                  placeholder=""
                  rows="5"
                  onChange={handleInput}
                />

                <label>Project Image: </label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  value={projectData.image}
                  placeholder=""
                  onChange={handleInput}
                />

                <label>Project Link: </label>
                <input
                  id="link"
                  required
                  type="text"
                  name="link"
                  value={projectData.link}
                  placeholder=""
                  onChange={handleInput}
                />

                <label>Project contributors: </label>
                <input
                  id="contributors"
                  required
                  type="text"
                  name="contributors"
                  value={projectData.contributors}
                  placeholder="username"
                  onChange={handleInput}
                />

                <label>Project progress:</label>
                <select
                    onChange={(e) => setProgress(e.target.value)}>
                    <option value='select'>Select</option>
                    <option value='ongoing'>Ongoing</option>
                    <option value='done'>Done</option>
                </select>

                {!loading && 
                  <button type="submit" className="text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Add Project
                  </button>}
                {loading && <button disabled>Adding project...</button>}
            </form>
        </>
        :
        <h2>Log in to Add Project</h2>
      }
    </div>
  );
}


export default Project
