import {Link} from 'react-router-dom'
// function BlogList({blogs, title, handleDelete}) {
function BlogList({blogs, title}) {

    return (
        <div className='blog-list'>
            <h2>{title}</h2>
            {blogs.map(blog => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2 className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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