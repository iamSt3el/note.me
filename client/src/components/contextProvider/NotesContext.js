import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    setIsNotesLoading(true)
    try {
      const response = await axios.get(`${API_URL}/note/get-notes`, {
        withCredentials: true,
      });
      setNotes(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsNotesLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/note/delete-note${id}`, {
        withCredentials: true,
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      if (selectedNote && selectedNote._id === id) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getNoteById = async (id) => {
    setIsNotesLoading(true);
    try {
      const noteFromState = notes.find((note) => note._id === id);
      if (noteFromState) {
        setSelectedNote(noteFromState);
        return noteFromState;
      }
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setIsNotesLoading(false);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(
        `${API_URL}/note/update-note${id}`,
        updatedNote,
        {
          withCredentials: true,
        }
      );
      setNotes([]);
      //setSelectedNote(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }finally{
      fetchNotes();
      navigate("/");
    }
  };

  const createNote = async (newNote) => {
    setIsNotesLoading(true);
    try {
      const response = await axios.post(`${API_URL}/note/add-note`, newNote, {
        withCredentials: true,
      });
      setNotes((prevNotes) => [...prevNotes, response.data]);
      setSelectedNote(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }finally{
      setIsNotesLoading(false);

    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        deleteNote,
        getNoteById,
        updateNote,
        createNote,
        fetchNotes,
        isNotesLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
