import SignIn from '../../components/SignIn/sign-in.component';

const SignInPage = ({ username, isLoggedIn, getToken }) => {
    return (
        <div className='sign-in-page'>
            <SignIn username={username} isLoggedIn={isLoggedIn} getToken={getToken}/>
        </div>
    )
}

export default SignInPage;