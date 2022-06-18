import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/auth";

import { External } from "./layouts/External";
import { Internal } from "./layouts/Internal";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { RecoverPassword } from "./pages/RecoverPassword";

import { Home } from "./pages/Home";

import { useAuth } from "./hooks/auth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<External />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Route>

          <Route element={<Internal />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
