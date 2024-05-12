import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Add routes here */}
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth">
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
