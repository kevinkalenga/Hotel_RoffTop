import { useSelector } from 'react-redux'
import { useLocation, Navigate } from "react-router-dom"

const PrivateRouter = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    // const token = document.cookie;
    const location = useLocation()
    if (user) {
        return children
    }


    return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRouter