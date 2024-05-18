import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PriveteRoute from "./components/PriveteRoute";
import OnlyAdminPriveteRoute from "./components/OnlyAdminPriveteRoute";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    // all routing path declarations goes here
    <BrowserRouter>
      {/* adding header to all pages */}
      <Header />
      {/* pages continue here  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PriveteRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPriveteRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
