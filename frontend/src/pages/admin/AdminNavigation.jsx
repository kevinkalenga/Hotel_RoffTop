import AdminImg from "../../assets/admin.png"
import { NavLink } from "react-router-dom"

const AdminNavigation = () => {
    return (
        <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between">
            <div>
                {/* header part */}
                <div className="mb-5">
                    <img src={AdminImg} alt="" className="size-14" />
                    <p className="font-semibold">Admin</p>
                </div>
                <hr />
                <ul className="space-y-5 pt-5">
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} to="/dashboard/add-new-post">Add New Post</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} to="/dashboard/manage-items">Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} to="/dashboard/users">Users</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mb-3">
                <hr />
                <button className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm">Logout</button>
            </div>

        </div>
    )
}

export default AdminNavigation