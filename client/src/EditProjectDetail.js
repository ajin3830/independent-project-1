import {useState} from 'react'
import {useParams} from 'react-router-dom'


function EditProjectDetail({project, redirectHome}) {

  const {id} =useParams()

  const [progress, setProgress] = useState('select')

  const [editFormData, setEditFormData] = useState(project)

  function handleEditFormChange(e) {
      const name = e.target.name
      const value = e.target.value
      setEditFormData({...editFormData, [name]: value})
  }

  function handleSave(e) {
    console.log('submited')
    e.preventDefault()

    const contributorArray = editFormData.contributors.split(',')
    const newContributorArray = contributorArray.map(contributor => {
      // console.log(contributor)
      if (contributor.length < 5) {
      // contributor + random number
        window.alert(`contributor ${contributor} modified to ${contributor}12345 as username for its new account, plz write down this temp password: ${contributor}12345password`)
        return `${contributor}12345`
      } 
      return contributor
    })
    // console.log(newContributorArray)
    const validContributors = newContributorArray.toString()

    const updatedProject = {
        title : editFormData.title,
        date : editFormData.date,
        description: editFormData.description,
        image : editFormData.image,
        link : editFormData.link,
        contributors: validContributors,
        progress: progress
    }
    // console.log(updatedProject)

    fetch(`/projects/${id}`, {
        method:'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(updatedProject)
    })
    .then(r => r.json())
    .then(data => {
        // console.log(data)
        redirectHome()
        // setEditFormData(data)
        // onUpdateProject(data)
      })
    }

    function handleSaveClick(e) {
      // e.preventDefault()
      handleSave(e)
    }
    
    function handleCancelClick() {
        redirectHome()
    }

    return (
        <>
          <form onSubmit={handleSave}>

            <label>Project Title: </label>
                <input
                  id="title"
                  required
                  type="text"
                  name="title"
                  value={editFormData.title}
                  placeholder="Project title"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project Date: </label>
                <input
                  id="date"
                  required
                  type="text"
                  name="date"
                  value={editFormData.date}
                  placeholder="Date"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project Description: </label>
                <textarea
                  id="description"
                  required
                  name="description"
                  value={editFormData.description}
                  placeholder="Description"
                  rows="5"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project Image: </label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  value={editFormData.image}
                  placeholder="Project image url"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project Link: </label>
                <input
                  id="link"
                  required
                  type="text"
                  name="link"
                  value={editFormData.link}
                  placeholder="Link"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project contributors: </label>
                <input
                  id="contributors"
                  required
                  type="text"
                  name="contributors"
                  value={editFormData.contributors}
                  placeholder="username"
                  onChange={handleEditFormChange}
                />
                <hr />

                <label>Project progress:</label>
                <select
                    onChange={(e) => setProgress(e.target.value)}>
                    <option value='select'>Select</option>
                    <option value='ongoing'>Ongoing</option>
                    <option value='done'>Done</option>
                </select>
                <hr />
          </form>

          <button 
            onClick={handleSaveClick}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
          >Save</button>

          <button 
              type="button" 
              onClick={handleCancelClick}
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
          >Cancel</button>
        </>
    )
}

export default EditProjectDetail