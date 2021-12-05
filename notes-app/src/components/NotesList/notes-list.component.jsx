import NewNote from '../NoteItem/new-note-item.component';
import NoteItem from '../NoteItem/note-item.component';
import './notes-list.styles.css';

const NotesList = ({ token, notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className="notes-list">
            {
                notes.map((note) => {
                    return (
                        <NoteItem 
                        key={note._id} 
                        _id={note._id} 
                        title={note.title} 
                        text={note.text} 
                        date={note.date} 
                        handleDeleteNote={handleDeleteNote} 
                        token={token} 
                        />
                    )
                })
            }
            <NewNote handleAddNote={handleAddNote} />
        </div>
    )
}

export default NotesList;