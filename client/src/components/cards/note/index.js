import React from "react";

import styles from "./note.module.scss";
import { formatDate } from "../../../utils/formatDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useNotes } from "../../contextProvider/NotesContext";

function Note(props) {
  const {note} = props;
  const { setNotes,deleteNote} = useNotes();


  const handleDeleteNode = () => {
    deleteNote(note._id)
    setNotes(prevNotes => prevNotes.filter(singleNote => singleNote._id !== note._id));

  }

 
  return (
    <article className={styles.container} style={{ backgroundColor: note.color }}>
      <div className={styles.content}>
        <h1>{note.title}</h1>
      </div>
      <div className={styles.readme}>
        <Link to={`/full-note/${note._id}`} state={{ color: note.color }}>
          Read More
        </Link>
      </div>
      <footer className={styles.footer}>
        <span>{formatDate(note.createdAt)}</span>
        <Icon icon={"material-symbols:delete"} onClick={handleDeleteNode} />
      </footer>
    </article>
  );
}

export default Note;
