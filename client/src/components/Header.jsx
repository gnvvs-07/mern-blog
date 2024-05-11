import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";
export default function Header() {
    // path declarations
    const path = useLocation().pathname;
    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via bg-purple-600 to-red-600 text-white rounded-md font-bold">L</span>
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
                <Button color="blue" pill className="hidden sm:inline">
                    <BsMoonStarsFill />
                </Button>
                {/* sign in */}
                <Link to="/sign-in">
                    <Button gradientDuoTone="purpleToBlue" outline className="inline">
                        Login
                    </Button>
                </Link>
                {/* navbar toggle */}
                <Navbar.Toggle />
            </div>
            {/* navabr compoennts/pages */}
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="about">
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="projects">
                        Projects
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/dashboard"} as={"div"}>
                    <Link to="dashboard">
                        Dashboard
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
