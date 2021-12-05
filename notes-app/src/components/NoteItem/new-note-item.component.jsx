import { Component } from 'react';
import './new-note-item.styles.css';

class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charTitle: 40,
            charText: 180,
            title: '',
            text: ''
        }
    }

    handleChangeTitle = (event) => {
        if (event.target.value.length > 40) {
            event.target.value = event.target.value.substring(0, 40)
        } else {  
            this.setState({ charTitle: 40 - event.target.value.length })
        }
        this.setState({ title: event.target.value })
    }

    handleChangeText = (event) => {
        if (event.target.value.length > 180) {
            event.target.value = event.target.value.substring(0, 180)
        } else {  
            this.setState({ charText: 180 - event.target.value.length })
        }
        this.setState({ text: event.target.value })
    }

    handleClick = () => {
        if (this.state.text.trim().length > 0 && this.state.title.trim().length > 0) {
            this.props.handleAddNote(this.state.title, this.state.text)
            this.setState({ charTitle: 40, charText: 180, title: '', text: '' })
        }
    }

    render () {
        return (
            <div className="new-note-item">
                <div className="ta">
                    <input type="text" onChange={this.handleChangeTitle} value={this.state.title} className="ta1" placeholder="Type to add a title..." />
                    <textarea onChange={this.handleChangeText} value={this.state.text} className="ta2" rows="4" cols="10" placeholder="Type to add a note..."></textarea>
                </div>
                <div className="footer">
                    <small>{this.state.charText} characters remaining</small>
                    <button onClick={this.handleClick} className="save">Save</button>
                </div>
            </div>
        )
    }
}

export default NewNote;