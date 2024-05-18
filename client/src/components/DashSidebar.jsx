import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowCircleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    // getting the location params
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      // sign out handler function
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // redux here
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md">
      <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            as="div"
          >
            Profile
          </Sidebar.Item>
        </Link>
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
