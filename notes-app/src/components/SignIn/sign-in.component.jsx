import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../FormInput/form-input.component';
import './sign-in.styles.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            token: ''
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.Username, "password": this.state.Password })
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/users/login', requestOptions)
            const data = await response.json()
            this.props.getToken(data.token)
            if (data.token) {
                this.props.username(this.state.Username)
                await this.setState({ Username: '', Password: '', token: data.token })
                localStorage.setItem('Username', this.state.Username)
                localStorage.setItem('token', data.token)
                this.props.history.push("/home");
            } else {
                localStorage.setItem('Username', '')
                localStorage.setItem('token', '')
                await this.setState({ Username: '', Password: '', token: '' })
            }
        } catch (e) {
            await this.setState({ Username: '', Password: '', token: '' })
            localStorage.setItem('Username', '')
            localStorage.setItem('token', '')
            this.props.getToken(undefined)
            alert("Wrong username/password!")
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render () {
        return (
            <div className='sign-in'>
                <h2 className="h2">Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="container1">
                        <FormInput className="txt" name="Username" type="text" handleChange={this.handleChange} value={this.state.Username} required/>
                    </div>
                    <div className="container2">
                        <FormInput className="txt" name="Password" type="password" handleChange={this.handleChange} value={this.state.Password} required/><br /><br />
                    </div>
                    <div className="container3">
                        <button type="submit" className="btnn">Login</button><br />
                    </div>
                    <div className="container4">
                        <Link to='/register'>Don't have an account?</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignIn);