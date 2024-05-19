import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiUser,
  HiArrowCircleRight,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    // Getting the location params
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      // Sign out handler function
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // Redux here
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md">
      <Sidebar.ItemGroup className="flex flex-col gap-2">
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            as="div"
          >
            Profile
          </Sidebar.Item>
        </Link>
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiOutlineDocumentText}
              as="div"
            >
              Posts
            </Sidebar.Item>
          </Link>
        )}
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              as="div"
            >
              Users
            </Sidebar.Item>
          </Link>
        )}
        <Sidebar.Item
          icon={HiArrowCircleRight}
          className="cursor-pointer"
          onClick={handleSignout}
        >
          SignOut
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}
