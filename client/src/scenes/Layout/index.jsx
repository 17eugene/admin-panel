import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useMediaQuery, Box } from "@mui/material";
import { useGetUserQuery } from "redux/api";

import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const userId = useSelector((state) => state.global.userId);

  const { data } = useGetUserQuery(userId);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpened(!isSidebarOpened);
  }, [isSidebarOpened]);
  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        user={data?.user}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpened={isSidebarOpened}
        toggleSidebar={toggleSidebar}
      />
      <Box width="100%">
        <Navbar
          user={data?.user}
          toggleSidebar={toggleSidebar}
          isSidebarOpened={isSidebarOpened}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
