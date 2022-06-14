import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthProvider from "./providers/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";

import useAuth from "./hooks/auth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user.token) {
    return <Navigate to="/authenticate" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/authenticate" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
