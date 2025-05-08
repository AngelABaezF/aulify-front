// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    if(!localStorage.getItem('token'))
        return <Navigate to='/dashboard'/>
    return children

}
export default ProtectedRoute