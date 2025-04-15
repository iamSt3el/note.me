import React, { useState } from "react";
import styles from "./notes.module.scss";
import Note from "../../components/cards/note";
import { useNotes } from "../../components/contextProvider/NotesContext";
import EmptyNote from "../../components/cards/empty-note";

function Notes() {
  const { notes, setNotes, deleteNote, isNotesLoading } = useNotes();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleDeleteNode = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    deleteNote(id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note &&
      note.title &&
      note.title.toLowerCase().includes((searchText || "").toLowerCase())
  );

  if (notes.length === 0 && !isNotesLoading) {
    return (
      <div className={styles.empty}>
        <p>You don't have notes</p>
        <EmptyNote/>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <header>
        <form onSubmit={handleSearch} role="search">
          <input
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      </header>
      <main>
        {filteredNotes.map((note) => (
          <Note key={note._id} note={note} deleteNote={handleDeleteNode} />
        ))}
      </main>
    </section>
  );
}

export default Notes;
