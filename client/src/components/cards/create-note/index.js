import React, { useState, useRef, useEffect} from "react";
import styles from "./createNote.module.scss";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../../atoms/color-picker";
import { HoverableIcon } from "../../../utils/HoverableIcon";
import { useNotes } from "../../contextProvider/NotesContext";

function EditNote() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [noteColor, setNoteColor] = useState("#CED693");
  const {createNote} = useNotes();

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const addnote =  () => {
    if(title === ""){
      alert("Enter Title ")
      return;
    }
    createNote({title, content, noteColor})
    navigate("/")
  };

  useEffect(() => {
    adjustTextarea();
  }, [content]);

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

  const handelCancel = () => {
    navigate(`/`);
  };

  return (
    <article className={styles.container}>
    <div className={styles.optionsContainer}>
      <div className={styles.options}>
        <div className={styles.colorPicker}>
          <ColorPicker noteColor={noteColor} setNoteColor={setNoteColor} />
        </div>
        <HoverableIcon
          icon="material-symbols:save"
          color="#059212"
          onClick={addnote}
          noteColor={noteColor}
        />
        <HoverableIcon
          icon="carbon:close-filled"
          color="#FC4100"
          onClick={handelCancel}
          noteColor={noteColor}
        />
      </div>
    </div>
    <div className={styles.content} style={{ backgroundColor: noteColor }}>
      <div className={styles.title}>
        <input
          placeholder="Write you title here"
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
      ></textarea>
    </div>
  </article>
  );
}

export default EditNote;
