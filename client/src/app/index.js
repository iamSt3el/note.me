import Login from "../pages/login";
import Register from "../pages/register";
import Notes from "../pages/notes";
import Main from "../layouts/Main";
import FullNote from "../components/cards/full-note";
import CreateNote from "../components/cards/create-note";
import EditNote from "../components/cards/edit-note";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../components/contextProvider/AuthContext";
import {
  ThemeProvider,
  useTheme,
} from "../components/contextProvider/ThemeContext";
import { PublicRoute } from "../route/publicRoutes/PublicRoutes";
import { ProtectedRoute } from "../route/protectedRoutes/ProtectedRoute";
import { NotesProvider } from "../components/contextProvider/NotesContext";

const ThemedApp = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <NotesProvider>
                <ProtectedRoute />
              </NotesProvider>
            }
          >
            <Route element={<Main />}>
              <Route path="/full-note/:id" element={<FullNote />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/edit-note/:id" element={<EditNote />} />
              <Route path="/" element={<Notes />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
