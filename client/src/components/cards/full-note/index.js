import React, { useEffect} from "react";

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
  const { selectedNote, getNoteById} = useNotes();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      await getNoteById(id);
    };

    if (!selectedNote || selectedNote._id !== id) {
      fetchNote();
    } else {
    }
  }, [id, selectedNote, getNoteById]);


  if (!selectedNote) {
    return <div></div>;
  }

  return (
    <article className={styles.container}>
      <div
        className={styles.content}
        style={{ backgroundColor: selectedNote.color }}
      >
        <div className={styles.options}>
          <div className={styles.info}>
            <h1>{selectedNote.title}</h1>
            <span>{formatDate(selectedNote.createdAt)}</span>
          </div>
          <Link to={`/edit-note/${id}`} >
            <Icon icon={"fa-regular:edit"} />
          </Link>
        </div>

        <Markdown
          remarkPlugins={[remarkGfm]}
          children={selectedNote.content}
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
