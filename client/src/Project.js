import {useState} from 'react'
import {useNavigate} from "react-router-dom";

// create a new project
function Project({user}) {

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState('Ongoing')

    let navigate = useNavigate()
    
    function redirectHome() {
        navigate('/')
        // console.log("Project Added!" + user.name)
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
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    // console.log(projectData.contributors)
    // console.log(typeof(projectData.contributors)) =>STRING

    // Split the contributors input value into an array and 
    // remove whitespaces from both ends of a string and returns a new string, 
    // without modifying the original string
    // const contributorsArray = projectData.contributors
    //                           .split(",").map(contributor => contributor.trim());
    // console.log(contributorsArray)
    // console.log(typeof(contributorsArray[0])) 
    // console.log(contributorsArray[0])

    const newProject = {
      title: projectData.title,
      date: projectData.date,
      description: projectData.description,
      image: projectData.image,
      link: projectData.link,
      contributors: projectData.contributors,
      progress: progress
    }
    // console.log(progress)
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
          console.log(data.contributors)
          window.alert('new project added, the temp password for the new user is usernamepassword ')
          setLoading(false)
          redirectHome()
          // console.log(typeof(data.contributors))
          // console.log(user.username)
      })
      // } else if (res.status === 500) {
      //   window.alert('Invalid contributors input!') 
      // }
      } else if (res.status === 400) {
        res.json()
        .then(error => window.alert(error['message']))
        // then clear contributors input or jsut the whole form
      }
    })
  }  
  
  return (
    <div className="new-project-form">
      {user ?
        <>
            <form onSubmit={handleSubmit}>

                <label>Project Title: </label>
                <input
                  id="title"
                  required
                  type="text"
                  name="title"
                  value={projectData.title}
                  placeholder="Project title"
                  onChange={handleInput}
                />
                <hr />

                <label>Project Date: </label>
                <input
                  id="date"
                  required
                  type="text"
                  name="date"
                  value={projectData.date}
                  placeholder="Date"
                  onChange={handleInput}
                />
                <hr />

                <label>Project Description: </label>
                <textarea
                  id="description"
                  required
                  name="description"
                  value={projectData.description}
                  placeholder="Description"
                  rows="5"
                  onChange={handleInput}
                />
                <hr />

                <label>Project Image: </label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  value={projectData.image}
                  placeholder="Project image url"
                  onChange={handleInput}
                />
                <hr />

                <label>Project Link: </label>
                <input
                  id="link"
                  required
                  type="text"
                  name="link"
                  value={projectData.link}
                  placeholder="Link"
                  onChange={handleInput}
                />
                <hr />

                <label>Project contributers: </label>
                <input
                  id="contributors"
                  required
                  type="text"
                  name="contributors"
                  value={projectData.contributors}
                  placeholder="username"
                  onChange={handleInput}
                />
                <hr />

                <label>Project progress:</label>
                <select
                    value={projectData.progress}
                    onChange={(e) => setProgress(e.target.value)}
                    >
                    <option value='ongoing'>Ongoing</option>
                    <option value='done'>Done</option>
                </select>
                <hr />

                {!loading && <button type="submit" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >Add Project</button>}
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
