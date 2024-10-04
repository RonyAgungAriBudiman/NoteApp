import React from "react";
import NoteInput from "./NoteInput";
import { getInitialData } from "../utils/data";
import NoteList from "./NoteList";

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          notes: getInitialData(),
          searchQuery: '',
        };
    
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
      }
      onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
          return {
            notes: [
              ...prevState.notes,
              {
                id: +new Date(),
                title,
                body,
                createdAt: new Date().toISOString(),
                archived: false,
              },
            ],
          };
        });
      }
    
      onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes });
      }
    
      onArchiveHandler(id) {
        this.setState((prevState) => ({
          prevState: prevState.notes.map((note) =>
            note.id === id ? (note.archived = !note.archived) : note
          ),
        }));
      }
    
      onSearchChangeHandler(event) {
        this.setState({ searchQuery: event.target.value });
      }

render() {
    const filteredActiveNotes = this.state.notes.filter((note) =>
        note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
  
      const filteredArchiveNotes = this.state.notes.filter((note) =>
        note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    return (
        <div className="note-app">
            <header className="note-app__header">
                <h1>Notes</h1>
                <div className="note-search">
                    <input
                    type="text"
                    placeholder="Cari Catatan ..."
                    value={this.state.searchQuery}
                    onChange={this.onSearchChangeHandler}
                    />
                </div>
            </header>
            <main className="note-app__body">
                <div className="note-input">
                    <h2>Buat Catatan</h2>
                    <NoteInput addNote={this.onAddNoteHandler} />
                </div>

                <h2>Catatan Aktif</h2>
                {this.state.notes.length > 0 ? (
                    <NoteList
                    notes={filteredActiveNotes}
                    status={false}
                    onArchive={this.onArchiveHandler}
                    onDelete={this.onDeleteHandler}
                    />
                ) : (
                    <div className="note-list__empty-message">Tidak ada Catatan.</div>
                )}
                <h2>Arsip</h2>
                {this.state.notes.length > 0 ? (
                    <NoteList
                    notes={filteredArchiveNotes}
                    status={true}
                    onArchive={this.onArchiveHandler}
                    onDelete={this.onDeleteHandler}
                    />
                ) : (
                    <div className="note-list__empty-message">Tidak ada Catatan.</div>
                )}
            </main>
        </div>
    );
 }
}
export default NoteApp;