import React, { useState, useRef, useEffect } from "react";
import styles from "./editNote.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ColorPicker from "../../atoms/color-picker";
import { HoverableIcon } from "../../../utils/HoverableIcon";
import { useNotes } from "../../contextProvider/NotesContext";

function EditNote() {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const { getNoteById, updateNote, selectedNote } = useNotes();
  const textareaRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true);
      try {
        const response = await getNoteById(id);
        setContent(response.content);
        setTitle(response.title);
        setNoteColor(response.color);
      } catch (error) {
        console.error('Error fetching note:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
    
  }, [id, selectedNote, getNoteById]);

  useEffect(() => {
    adjustTextarea();
  }, [content]);

  const handleUpdate = () => {
    updateNote(id, { title, content, noteColor });
  };

  const adjustTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (ev) => {
    setContent(ev.target.value);
  };

  const handleCancel = () => {
    navigate(`/full-note/${id}`);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <article className={styles.container}>
        <div className={styles.optionsContainer}>
          <div className={styles.options}>
            <div className={styles.colorPicker}>
              <ColorPicker noteColor={noteColor} setNoteColor={setNoteColor} />
            </div>
            <HoverableIcon
              icon="material-symbols:save"
              color="#059212"
              onClick={handleUpdate}
              noteColor={noteColor}
            />
            <HoverableIcon
              icon="carbon:close-filled"
              color="#FC4100"
              onClick={handleCancel}
              noteColor={noteColor}
            />
          </div>
        </div>
        <div className={styles.content} style={{ backgroundColor: noteColor }}>
          <div className={styles.title}>
            <input
              placeholder="Write your title here"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Write here"
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            style={{ backgroundColor: noteColor }}
          ></textarea>
        </div>
      </article>
    </>
  );
}

export default EditNote;
