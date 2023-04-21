import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from './UserContext';
import {BiHomeHeart} from 'react-icons/bi';
import {TbBrandBlogger} from 'react-icons/tb';
import {AiOutlineProject} from 'react-icons/ai';
import {MdAccountCircle} from 'react-icons/md';
import {FaSignOutAlt} from 'react-icons/fa';


function Navbar ({onLogout}) {
  const {user} = useContext(UserContext)

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
        <h1 className='text-2xl font-normal md:font-bold'>Portfolio</h1>
        <div className='links'>
          <Link to='/' className='font-normal md:font-bold pe-8 '>
            HOME
            <BiHomeHeart className='text-4xl'/>
          </Link>

          <Link to='/create' className='font-normal md:font-bold pe-8' >
            BLOG
            <TbBrandBlogger className='text-4xl' />
          </Link>
          
          <Link to='/project' className='font-normal md:font-bold pe-8' >
            PROJECT
            <AiOutlineProject className='text-4xl'/>
          </Link>

        {user ?
          <>
            <Link to='/account' className='font-normal md:font-bold pe-8'
              >{user.username}
              <MdAccountCircle className='text-4xl'/>
            </Link>
              
            <Link to="/logout" className='font-normal md:font-bold'>
              <button onClick={handleLogout}
              >Logout
              <FaSignOutAlt className='text-4xl'/>
              </button>
            </Link>
          </>
          : 
          <>
            <Link to='/account' className='font-normal md:font-bold'>
              Account
              <MdAccountCircle className='text-4xl'/>
            </Link>
          </>
        }
        </div>
    </nav>
  )
}
export default Navbar