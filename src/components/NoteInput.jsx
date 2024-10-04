import React from "react";

class NoteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body:'',
            charLimit:50,
        };
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event){
        this.setState(()=>{
            return {
                title: event.target.value,
            };
        });
    }
    
    onBodyChangeEventHandler(event){
        this.setState(()=>{
            return {
                body: event.target.value,
            };
        });
    }
    
    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render(){
        const charRemaining = this.state.charLimit - this.state.title.length;
        return (
           <form onSubmit={this.onSubmitEventHandler}>
            <p className="note-input__title__char-limit">
                sisa karakter : {charRemaining}
            </p>
            <input className="note-input__title" type="text" placeholder="ini adalah Judul" required 
                value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                
            <textarea className="note-input__body" type="text" placeholder="Tuliskan catatan anda disini..." required
            spellCheck="false" value={this.state.body} onChange={this.onBodyChangeEventHandler}
            />
            <button type="submit">Buat</button>


           </form>
        );
    }
}

export default NoteInput;