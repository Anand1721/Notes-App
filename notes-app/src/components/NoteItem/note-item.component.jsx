import { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { MdDeleteForever } from 'react-icons/md';
import './note-item.styles.css';

class Normal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    toggle = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render () {
        return (
            <div className="note-item">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete Note?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>Do you really want to delete this note?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleDeleteNote(this.props._id)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="header">
                    <div className="te">
                        <span className="title">{this.props.title}</span>
                        <button onClick={() => this.props.handleClickEdit()} className="edit">{this.props.editText}</button>
                    </div>
                    <div className="content">{this.props.text}</div>
                </div>
                <div className="footer">
                    {this.props.date}
                    <MdDeleteForever onClick={this.toggle} className="delete-icon" size="1.3em"/>
                </div>
            </div>
        )
    }
}

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            show: false
        }
    }

    componentDidMount() {
        this.setState({ title: this.props.title, text: this.props.text })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.name === "title") {
            if (event.target.value.length > 40) {
                event.target.value = event.target.value.substring(0, 40)
            } else {  
                this.setState({ charTitle: 40 - event.target.value.length })
            }
        } else {
            if (event.target.value.length > 180) {
                event.target.value = event.target.value.substring(0, 180)
            } else {  
                this.setState({ charText: 180 - event.target.value.length })
            }
        }
    }

    toggle = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render () {
        return (
            <div className="edit-note-item">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete Note?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>Do you really want to delete this note?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleDeleteNote(this.props._id)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="header">
                    <div className="te">
                        <input type="text" name="title" defaultValue={this.props.title} onChange={this.handleChange} id="edit-title" />
                        <button onClick={() => this.props.handleClickSave(this.state.title, this.state.text)} className="edit">{this.props.editText}</button>
                    </div>
                    <textarea name="text" onChange={this.handleChange} defaultValue={this.props.text} rows="4" cols="40" id="edit-content"></textarea>
                </div>
                <div className="footer">
                    {this.props.date}
                    <MdDeleteForever onClick={this.toggle} className="delete-icon" size="1.3em"/>
                </div>
            </div>
        )
    }
}

class NoteItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: this.props.title,
            text: this.props.text,
            editText: 'Edit'
        }
    }

    handleClickEdit = () => {
        if (this.state.editText === 'Edit') {
            this.setState({  editText: 'Save' })
        } else {
            this.setState({ editText: 'Edit' })
        }
    }

    handleClickSave = async (title, text) => {
        const d = new Date()
        const date = d.toLocaleDateString()
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify({ "title": title, "text": text, "date": date })
        }
        try {
            await fetch(`http://127.0.0.1:3000/notes/${this.props._id}`, requestOptions)
            this.setState({ title, text })
            this.handleClickEdit()
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        return (
            this.state.editText === 'Edit' ?
            <Normal handleDeleteNote={this.props.handleDeleteNote} handleClickEdit={this.handleClickEdit} title={this.state.title} text={this.state.text} _id={this.props._id} date={this.props.date} editText={this.state.editText} /> :
            <Edit handleDeleteNote={this.props.handleDeleteNote} handleClickSave={this.handleClickSave} title={this.state.title} text={this.state.text} _id={this.props._id} date={this.props.date} editText={this.state.editText} />
        )
    }
}

export default NoteItem;