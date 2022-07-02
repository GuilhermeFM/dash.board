import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/auth";

import { External } from "./layouts/External";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { RecoverPassword } from "./pages/RecoverPassword";

import { RequireAuth } from "./components/Auth/RequireAuth";

import { Internal } from "./layouts/Internal";
import { Home } from "./pages/Home";
import { Users } from "./pages/admin/User";
import { Permissions } from "./pages/admin/Permissions";

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
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="/permissions"
              element={
                <RequireAuth>
                  <Permissions />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
