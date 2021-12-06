import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage.component';
import { Component } from 'react';
import RegisterPage from './pages/RegisterPage/RegisterPage.component';
import HomePage from './pages/HomePage/HomePage.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      Username: '',
      token: ''
    }
  }

  componentDidMount = async () => {
    await this.setState({
      Username: localStorage.getItem('Username'),
      token: localStorage.getItem('token')
    })
    if (localStorage.getItem('Username') !== '' && localStorage.getItem('token') !== '') {
      await this.setState({ loggedIn: true })
      localStorage.setItem('loggedIn', true)
    } else {
      await this.setState({ loggedIn: false })
      localStorage.setItem('loggedIn', false)
    }
  }

  token = async (tkn) => {
    if (tkn) {
      await this.setState({ token: tkn, loggedIn: true })
      localStorage.setItem('token', tkn)
      localStorage.setItem('loggedIn', true)
    } else {
      await this.setState({ token: '', loggedIn: false })
      localStorage.setItem('token', '')
      localStorage.setItem('loggedIn', false)
    }
  }

  username = async (uname) => {
    if (uname) {
      await this.setState({ Username: uname })
      localStorage.setItem('Username', uname)
    } else {
      await this.setState({ Username: '', loggedIn: false })
      localStorage.setItem('Username', '')
      localStorage.setItem('loggedIn', false)
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            {localStorage.getItem('loggedIn') === 'true' ? <Redirect to="/home" /> : <Redirect to="/signin" /> }
          </Route>
          <Route exact path="/home">
            {localStorage.getItem('loggedIn') === 'true' ? <HomePage Username={localStorage.getItem('Username')} token={localStorage.getItem('token')} /> : <Redirect to="/signin" /> }
          </Route>
          <Route exact path="/signin" render={() => {
            return (localStorage.getItem('loggedIn') === 'true' ? <Redirect to='/home' /> : <SignInPage username={this.username} isLoggedIn={localStorage.getItem('loggedIn')} getToken={this.token} />)
          }} />
          <Route exact path="/register" render={() => {
            return <RegisterPage username={this.username} isLoggedIn={localStorage.getItem('loggedIn')} getToken={this.token} />
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
