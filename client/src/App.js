import Navbar from './Navbar'
import Home from './Home'
import Create from './Create'
import BlogDetails from './BlogDetails'
import Account from './Account'
import Project from './Project'
import ProjectDetails from './ProjectDetails'
import NotFound from './NotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'


function App() {
  const [user, setUser] = useState(null)

  // user remains logged in
  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      // console.log(r)
      if (r.ok) {
        r.json()
        .then((user) => {setUser(user)});
      }
    });
  }, []);

  function onLogout() {
    setUser(null)
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={onLogout}/>
        <div className='content'>
          <Routes>
            <Route 
              exact
              path="/"
              element= {<Home />}
            /> 
            <Route 
            // create a blog
              exact
              path="/create"
              element= {<Create user={user} />}
            /> 
            <Route 
              exact
              path="/blogs/:id"
              element= {<BlogDetails />}
            /> 
            <Route 
            // create a project
              exact
              path="/project"
              element= {<Project user={user} />}
            /> 
            <Route 
              exact
              path="/projects/:id"
              element= {<ProjectDetails />}
            /> 
            <Route 
              exact
              path="/account"
              element= {<Account user={user} setUser={setUser}/>}
            /> 
            <Route 
              path="*"
              element= {<NotFound />}
            /> 
          </Routes>
          {/* <p>{Math.random() * 10}</p> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
