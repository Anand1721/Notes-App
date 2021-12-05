import NewNote from '../NoteItem/new-note-item.component';
import NoteItem from '../NoteItem/note-item.component';
import './notes-list.styles.css';

const NewNotesList = (props) => {
    return (
        <div className="notes-list">
            {
                props.notes.map((note, i) => {
                    return (
                        <NoteItem key={i} id={note.id} title={note.title} text={note.text} date={note.date} newnote={props.newnote}/>
                    )
                })
            }
            <NewNote />      
        </div>
    )
}

export default NewNotesList;