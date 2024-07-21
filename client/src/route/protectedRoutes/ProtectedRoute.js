import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../components/contextProvider/AuthContext";
import Loader from "../../components/shared/loader"
import { useNotes } from "../../components/contextProvider/NotesContext";
import PencilIcon from "../../components/shared/pencilIcon";


export const ProtectedRoute = () => {
    const{isAuthenticated, loading} = useAuth();
    const {isNotesLoading} = useNotes();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
          setIsLoading(true);
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 1100);
          return () => clearTimeout(timer);
        }
      }, [loading]);


    if(loading || isLoading){
        return <Loader/>
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
  }

    //return  isAuthenticated ? <Outlet/> : <Navigate to="/login"/>

    return (
      <>
          {isNotesLoading && (
              <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999
              }}>
                  <PencilIcon />
              </div>
          )}
          <Outlet />
      </>
  );
}