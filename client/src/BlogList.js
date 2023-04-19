import {Link} from 'react-router-dom'
// function BlogList({blogs, title, handleDelete}) {
function BlogList({blogs, title}) {

    return (
        <div className='blog-list font-normal md:font-bold'>
            <h2>{title}</h2>
            {blogs.map(blog => (
                <div className="blog-preview text-center shadow-lg p-10 rounded-xl my-10" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2 className="text-white bg-gradient-to-br from-blue-600 to-slate-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center mr-2 mb-2"
                        >{blog.title}</h2>
                        <p>Contributed by: {blog.contributor}</p>
                        <p>Progress: {blog.progress}</p>
                    </Link>
                    {/* <button onClick={() => handle Delete(blog.id)}>Delete</button> */}
                </div>
            ))}
        </div>
    )
}
export default BlogList