import { useParams, Link } from "react-router-dom"
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogApis"
const RelatedBlogs = () => {
    const { id } = useParams()
    const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id)
    return (
        <div>
            <h3 className="text-2xl font-medium pt-8 px-8 pb-5">Related Blogs</h3>
            <hr />
            {
                blogs.length > 0 ?
                    (
                        <div className="space-y-4 mt-5">
                            {
                                blogs.map((blog) => (
                                    <Link to={`/blogs/${blog?._id}`}
                                        key={blog._id}
                                        className="flex flex-col sm:flex-row sm:items-center 
                                      gap-4 shadow-sm px-8 py-4">
                                        <div className="customcss">
                                            <img src={blog.coverImg} alt=""
                                                className="h-full w-full rounded-full ring-2 ring-blue-700"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-[#1E73BE]">
                                                {/* it will not show more than fifteen carac */}
                                                {blog?.title.substring(0, 50)}
                                            </h4>
                                            <p>{blog?.description?.substring(0, 50)}...</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    ) : (<div className="p-8">No related blogs found</div>)
            }
        </div>
    )
}

export default RelatedBlogs