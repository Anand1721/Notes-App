import { Navbar, Nav, NavDropdown, Form, FormControl, Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.styles.css';
import { Component } from "react";
import { MdDeleteForever } from 'react-icons/md';
import FormInput from "../FormInput/form-input.component";

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: 'User',
            show: false,
            showName: '',
            showCP: false,
            currentPassword: '',
            newPassword: '',
            retypePassword: ''
        }
    }

    async componentDidMount () {
        await this.setState({ Username: this.props.Username })
    }

    toggle = (event) => {
        if (event.target.id === "logout" || event.target.id === "logout-div") {
            this.setState({ show: true, showName: 'Logout' })
        } else if(event.target.id === "delete" || event.target.id === "del") {
            this.setState({ show: true, showName: 'Delete' })
        } else if(event.target.id === "cp") {
            this.setState({ showCP: true })
        }
    }

    handleClose = () => {
        this.setState({ show: false, showCP: false })
    }

    handleLogout = async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders
        }
        try {
            await fetch('http://127.0.0.1:3000/users/logoutAll', requestOptions)
            localStorage.setItem('Username', '');
            localStorage.setItem('token', '');
            localStorage.setItem('loggedIn', false);
            this.props.history.push("/signin");
        } catch (e) {
            console.log(e)
        }
    }

    handleDelete = async (event) => {
        event.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        }
        try {
            await fetch('http://127.0.0.1:3000/users/delete', requestOptions)
            this.props.history.push("/signin");
        } catch (e) {
            console.log(e)
        }
    }

    handleChange = async (value, id) => {
        await this.setState({ [id]: value })
    }

    handleTestLogin = async (currentPassword) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.Username, "password": currentPassword })
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/users/testLogin', requestOptions)
            const data = await response.json()
            return data
        } catch (e) {
            return {"Error": "User doesn't exist"}
        }
    }

    handleChangePassword = async (event) => {
        event.preventDefault()
        const { currentPassword, newPassword, retypePassword } = this.state
        const testLogin = await this.handleTestLogin(currentPassword)
        if (testLogin.Error) {
            return this.setState({ currentPassword: '', newPassword: '', retypePassword: '' }, alert("Wrong Password!"))
        }
        if (newPassword.length < 7) {
            return this.setState({ currentPassword: '', newPassword: '', retypePassword: '' }, alert("New password should be atleast 7 characters long!"))
        }
        if (newPassword !== retypePassword) {
            return this.setState({ currentPassword: '', newPassword: '', retypePassword: '' }, alert("New password doesn't match!"))
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
            body: JSON.stringify({ "username": this.state.Username, "password": currentPassword, "newPassword": newPassword })
        }
        try {
            await fetch('http://127.0.0.1:3000/users', requestOptions)
            return this.setState({ currentPassword: '', newPassword: '', retypePassword: '', showCP: false }, alert("Password changed successfully!"))
        } catch (e) {
            return alert("Password change unsuccessful!")
        }
    }

    render () {
        return (
            <div>
                <Modal show={this.state.showCP} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleChangePassword}>
                        <Modal.Body id="modal-body">
                            <FormInput id="currentPassword" value={this.state.currentPassword} onChange={(event) => this.handleChange(event.target.value, event.target.id)} type="password" name="Current Password" required/>
                            <FormInput id="newPassword" value={this.state.newPassword} onChange={(event) => this.handleChange(event.target.value, event.target.id)} type="password" name="New Password" required/>
                            <FormInput id="retypePassword" value={this.state.retypePassword} onChange={(event) => this.handleChange(event.target.value, event.target.id)} type="password" name="Retype Password" required/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Change Password
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.showName}?</Modal.Title>
                    </Modal.Header>
                    {
                        this.state.showName === 'Logout' ?
                        <Modal.Body>Do you really want to logout?</Modal.Body> :
                        <Modal.Body>Do you really want to delete your account? You will lose all your notes!</Modal.Body>
                    }
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                        {this.state.showName === 'Logout' ?
                            <Button variant="primary" onClick={this.handleLogout}>
                                Yes
                            </Button> :
                            <Button variant="primary" onClick={this.handleDelete}>
                                Yes
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
                <Navbar id="main" variant="dark" expand="lg">
                    <Navbar.Brand id="nb1"><b id="b">Notes App </b><img alt='' width="25" height="25" src={Logo}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form id="cstm" className="ms-auto" inline>
                            <MdSearch className="search-icon" size="2.37em" />
                            <FormControl id="fc" onChange={async (event) => await this.props.handleSearch(event.target.value)} type="search" placeholder="Search by title..." className="mr-sm-2" />
                        </Form>
                        <Nav className="ml-auto">
                            <NavDropdown title={<b>Hello, {this.state.Username}</b>} id="basic-nav-dropdown">
                                <NavDropdown.Item id="cp" onClick={this.toggle}><div id="cp">Change Password</div></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item id="logout" onClick={this.toggle}><div id="logout-div">Logout</div></NavDropdown.Item>
                                <NavDropdown.Item id="delete" onClick={this.toggle}><div id="del">Delete Account <MdDeleteForever size="1.3em"/></div></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavbarComponent);