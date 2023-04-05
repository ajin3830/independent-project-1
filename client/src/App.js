import Navbar from './Navbar'
import Home from './Home'
import Create from './Create'
import BlogDetails from './BlogDetails'
import Account from './Account'
import Project from './Project'
import ProjectDetails from './ProjectDetails'
import NotFound from './NotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {useState, useEffect} from 'react'


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
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
              element= {<Create />}
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
              element= {<Project />}
            /> 
            <Route 
              exact
              path="/projects/:id"
              element= {<ProjectDetails />}
            /> 
            <Route 
              exact
              path="/account"
              element= {<Account />}
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
