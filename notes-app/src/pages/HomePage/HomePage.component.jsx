import { Component } from 'react';
import NavbarComponent from "../../components/Nav/navbar.component";
import NotesList from "../../components/NotesList/notes-list.component";
import './HomePage.styles.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            search: ''
        }
    }

    async componentDidMount () {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/notes/get', requestOptions)
            const data = await response.json()
            const userNotes = []
            data.forEach((note) => {
                userNotes.push(note)
            })
            if (!this.state.calledBySearch) {
                this.setState({ notes: userNotes })
            }
        } catch (e) {
            console.log(e)
        }
    }

    addNote = async (title, text) => {
        const date = new Date()
        const newNote = {
            title,
            text,
            date: date.toLocaleDateString()
        }
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newNote)
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/notes/create', requestOptions)
            const data = await response.json()
            const newNotes = this.state.notes
            newNotes.push(data)
            this.setState({ notes: newNotes })
        } catch (e) {
            console.log(e)
        }
    }

    deleteNote = async (_id) => {    
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders
            }
            await fetch(`http://127.0.0.1:3000/notes/${_id}`, requestOptions)
            const newNotes = this.state.notes.filter((note) => note._id !== _id)
            this.setState({ notes: newNotes })
        } catch (e) {
            console.log(e)
        }
    }

    search = async (searchfield) => {
        await this.setState({ search: searchfield.toLowerCase() })
    }

    render () {
        const filteredNotes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.search)
        })
        return (
            <div>
                <NavbarComponent Username={this.props.Username} token={this.props.token} handleSearch={this.search}/>
                <NotesList token={this.props.token} notes={filteredNotes} handleAddNote={this.addNote} handleDeleteNote={this.deleteNote} />
            </div>
        )
    }
}

export default HomePage;