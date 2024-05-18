import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from "../redux/user/userSlice.js";
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        window.location.href = "/sign-in";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via bg-purple-600 to-red-600 text-white rounded-md font-bold">
          L
        </span>
        Blogs
      </Link>
      {/* adding search icons from flowbite */}
      <form>
        <TextInput
          placeholder="search"
          className="hidden lg:inline"
          // adding search icon
          rightIcon={AiOutlineSearch}
        />
      </form>
      {/* button for small icon */}
      <Button color="blue" className="lg:hidden" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          color="blue"
          pill
          className="hidden sm:inline"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <BsMoonStarsFill />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              {/* details of user */}
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-bold truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline className="inline">
              Login
            </Button>
          </Link>
        )}
        {/* sign in */}
        {/* navbar toggle */}
        <Navbar.Toggle />
      </div>
      {/* navabr compoennts/pages */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="projects">Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard"} as={"div"}>
          <Link to="dashboard">Dashboard</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
