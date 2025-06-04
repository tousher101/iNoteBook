import SignUp from '../Pages/Auth/SignUp'
import SignIn from '../Pages/Auth/SignIn'
import StartUp from '../Pages/StartUp'
import ForgetPass from '../Pages/Auth/ForgetPass'

export const AuthRouter = [
    {
        path: '/',
        element: <StartUp/>

    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/signin',
        element: <SignIn/>
    },
    {
        path: '/forgetpassword',
        element: <ForgetPass/>
    }
]