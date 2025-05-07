import { useState } from "react"
import { Link } from "react-router-dom"


const Register = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')


    return (
        <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
            <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
            <form className='space-y-5 max-w-sm mx-auto pt-8'>
                <input type="text" value={username}
                    placeholder="Username" required
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                />
                <input type="text" value={email}
                    placeholder="Email" required
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                />
                <input type="password" value={password}
                    placeholder="Password" required
                    className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
                />
                {
                    message && <p className="text-red-500">{message}</p>
                }
                <button className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white 
                   font-medium rounded-md py-1">
                    Login
                </button>
            </form>
            <p className="my-5 text-center">
                Already have an account? Please <Link to="/login" className="text-red-700 italic"> Login</Link>
            </p>

        </div>
    )
}

export default Register