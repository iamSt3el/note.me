import React, { useEffect, useState} from "react";

import styles from "./fullnote.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDate } from "../../../utils/formatDate";
import { Link,useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNotes } from "../../contextProvider/NotesContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function FullNote() {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedNote, getNoteById} = useNotes();
  const [note, setNote] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNoteById(id);
        setNote(response);
      } catch (error) {
        console.error('Error fetching note:', error);
        // Handle error (e.g., show error message to user)
      }finally{
        setIsLoading(false);
      }
      
    };

      fetchNote();
  }, [id, selectedNote, getNoteById, setNote]);


  if (isLoading) {
    return <div></div>;
  }

  return (
    <article className={styles.container}>
      <div
        className={styles.content}
        style={{ backgroundColor: note.color }}
      >
        <div className={styles.options}>
          <div className={styles.info}>
            <h1>{note.title}</h1>
            <span>{formatDate(note.createdAt)}</span>
          </div>
          <Link to={`/edit-note/${id}`} >
            <Icon icon={"fa-regular:edit"} />
          </Link>
        </div>

        <Markdown
          remarkPlugins={[remarkGfm]}
          children={note.content}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={atomDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </article>
  );
}

export default FullNote;
