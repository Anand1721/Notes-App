import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../FormInput/form-input.component';
import './register.styles.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Token: ''
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.Password.length < 7) {
            return alert("Password should be atleast 7 characters long!")
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.Username, "email": this.state.Email, "password": this.state.Password })
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/users/create', requestOptions)
            const data = await response.json()
            this.props.getToken(data.token)
            if (data.token) {
                this.props.username(this.state.Username)
                this.setState({ Username: '', Email: '', Password: '', Token: data.token })
                this.props.history.push("/home");
            } else {
                this.setState({ Username: '', Email: '', Password: '', Token: '' })
            }
        } catch (e) {
            console.log(e)
            alert("Username/Email already taken!")
            this.setState({ Username: '', Email: '', Password: '', Token: '' })
            this.props.getToken(undefined)
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render () {
        return (
            <div className='register'>
                <h2 className="h2">Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="container1">
                        <FormInput className="txt" name="Username" type="text" handleChange={this.handleChange} value={this.state.Username} required/>
                    </div>
                    <div className="container2">
                        <FormInput className="txt" name="Email" type="email" handleChange={this.handleChange} value={this.state.Email} required/>
                    </div>
                    <div className="container2">
                        <FormInput className="txt" name="Password" type="password" handleChange={this.handleChange} value={this.state.Password} required/><br /><br />
                    </div>
                    <div className="container3">
                        <button type="submit" className="btnn">Register</button><br />
                    </div>
                    <div className="container4">
                        <Link to='/signin'>Already have an account?</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Register);