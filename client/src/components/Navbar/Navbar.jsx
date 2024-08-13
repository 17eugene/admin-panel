import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "redux/global-slice/global-slice";
import {
  useTheme,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  CloseOutlined,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import FlexBetween from "components/FlexBetween/FlexBetween";

import profileImage from "assets/avatar.png";

const Navbar = ({ user, toggleSidebar, isSidebarOpened }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchor, setAnchor] = useState(null);
  const isOpen = Boolean(anchor);
  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const toggleThemeMode = useCallback(() => {
    dispatch(setMode());
  }, [dispatch]);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={toggleSidebar}>
            {isSidebarOpened ? (
              <CloseOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <MenuIcon sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="2.5rem"
            p="0.1rem 0.3rem 0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="0.5rem">
          <IconButton onClick={toggleThemeMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button onClick={handleClick}>
              <FlexBetween textTransform="none" gap="0.75rem" flexShrink="0">
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                ></Box>
                <Box>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: "0.8rem",
                      textAlign: "left",
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: "0.6rem",
                      textAlign: "left",
                      color: theme.palette.secondary[200],
                    }}
                  >
                    {user?.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[200] }}
                />
              </FlexBetween>
            </Button>

            <Menu
              anchorEl={anchor}
              onClose={handleClose}
              open={isOpen}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>
                <Typography>Sign out</Typography>
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
