import Register from '../../components/Register/register.component';

const RegisterPage = ({ username, isLoggedIn, getToken }) => {
    return (
        <div className='register-page'>
            <Register username={username} isLoggedIn={isLoggedIn} getToken={getToken}/>
        </div>
    )
}

export default RegisterPage;