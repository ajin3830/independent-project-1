import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <div className="not-found font-normal md:font-bold" >
            <h2>Sorry</h2>
            <p>This page cannot be found</p>
            <Link to='/' className='text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center mr-2 mb-2'>
                Back to the homepage</Link>
        </div>
    )
}

export default NotFound