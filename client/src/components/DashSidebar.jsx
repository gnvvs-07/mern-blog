import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowCircleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
export default function DashSidebar() {
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
        <Sidebar.Item icon={HiArrowCircleRight} className="cursor-pointer">
          SignOut
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}
