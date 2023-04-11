import {Link, useNavigate} from 'react-router-dom';

function Navbar ({user, onLogout}) {
    
      let navigate = useNavigate()
    
      function redirectHome() {
          navigate('/')
      }
    
      function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => {
          onLogout()
          redirectHome()
        });
      }

    return (
        <nav className="navbar">
            <h1 className='text-2xl'
            >APP</h1>
            <div className='links'>
                <Link to='/' className='text-xl'>Home</Link>
                <Link to='/create' className='text-l text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-1 rounded ml-8'
                >New Blog</Link>
                <Link to='/project' className='text-l text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-1 rounded ml-8'
                >New Project</Link>
                <Link to='/account' className='text-l text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-1 rounded ml-8'
                >Account</Link>
                {user ?
                <>
                    <Link to="/logout">
                        <button className="NavBarButton" onClick={handleLogout}>Logout</button>
                    </Link>
                    
                </>
                    : ''
                }
            </div>
        </nav>
    )
}
export default Navbar