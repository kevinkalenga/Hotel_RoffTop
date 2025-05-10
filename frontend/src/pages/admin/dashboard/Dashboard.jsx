import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri"
import { useState } from "react";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogApis";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentApi";
import { useGetUserQuery } from "../../../redux/features/userAuth/userAuthApi";
import BlogsChart from "./BlogsChart";


const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const [query, setQuery] = useState({ search: '', category: '' })
    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query)
    const { data: comments = [] } = useGetCommentsQuery()
    const { data: users = {} } = useGetUserQuery()

    let adminCounts = 0;
    let userCounts = 0;

    if (Array.isArray(users)) {
        users.forEach(user => {
            if (user.role === 'admin') adminCounts++;
            else if (user.role === 'user') userCounts++;
        });
    }
    // const adminCounts = Array.isArray(users)
    //     ? users.filter(user => user.role === 'admin').length
    //     : 0;
    // const userCounts = Array.isArray(users)
    //     ? users.filter(user => user.role === 'user').length
    //     : 0;

    // console.log(users)
    return (
        <>
            {isLoading && (<div>Loading....</div>)}
            <div className="space-y-6">
                <div className="bg-bgPrimary p-5">
                    <h1>Hi, {user?.username}</h1>
                    <p>Welcome to the admin dashbord</p>
                    <p>
                        Here you can manage your hotel's posts, manage rooms, and other
                        administrative tasks.
                    </p>
                </div>
                {/* cards grid */}
                <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                    <div className="bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <FiUsers className="size-8 text-indigo-600" />
                        <p>{userCounts} User{userCounts !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <FaBlog className="size-8 text-red-600" />
                        <p>{blogs.length} Blogs</p>
                    </div>
                    <div className="bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <RiAdminLine className="size-8 text-lime-600" />
                        <p>{adminCounts} Admin {adminCounts !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
                        <FaRegComment className="size-8 text-orange-600" />
                        <p>{comments?.totalComment} comments</p>
                    </div>
                </div>
                {/* graphs and chart */}
                <div className="pt-5 pb-5">
                    <BlogsChart blogs={blogs} />
                </div>
            </div>
        </>
    )
}

export default Dashboard