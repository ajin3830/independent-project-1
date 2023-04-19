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
import { UserContext } from './UserContext'


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

  const userContextValue = {
    user, setUser
  }

  return (
    <UserContext.Provider value={userContextValue}>
    <Router>
      <div className="App bg-yellow-100 min-h-screen">
        <Navbar onLogout={onLogout}/>
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
              element= {<BlogDetails user={user} />}
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
              element= {<ProjectDetails user={user} />}
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
    </UserContext.Provider>
  );
}

export default App;
