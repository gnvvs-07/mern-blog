import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    // getting the location params
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab");
  }, [location.search]);
  return <div>
    <div className="">
      {/* sidebar */}
      
    </div>
    {/* profile */}
  </div>;
}
