import {Link} from 'react-router-dom';

function Navbar () {
    return (
        <nav className="navbar">
            <h1 className='text-2xl'
            >APP</h1>
            <div className='links'>
                <Link to='/' className='text-xl'>Home</Link>
                <Link to='/create' className='text-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-3 rounded ml-8'
                >New Blog</Link>
                <Link to='/project' className='text-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-3 rounded ml-8'
                >New Project</Link>
                <Link to='/account' className='text-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-3 rounded ml-8'
                >Account</Link>
            </div>
        </nav>
    )
}
export default Navbar