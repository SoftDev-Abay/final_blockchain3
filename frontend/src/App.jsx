import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Profile from "./pages/home/Profile";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/auth">
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
