import React from "react";
import NoteItemContent from "./NoteItemContent";
import { showFormattedDate } from "../utils/data";

function NoteList({notes, onDelete, onArchive, status}){
    const filtered = notes.filter((note)=> note.archived === status )
    return(
        <div className="note-list">
            {filtered.map(
                (note) => 
                    note.archived === status && (   
                    <NoteItemContent 
                    key={note.id} 
                    id={note.id}
                    onDelete={onDelete} 
                    onArchive={onArchive} 
                    createdAt={showFormattedDate(note.createdAt)}
                    {...note}/>
                )
            )}
        </div>
    );
}

export default NoteList;