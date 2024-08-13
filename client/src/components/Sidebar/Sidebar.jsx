import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronRightOutlined,
  ChevronLeft,
  SettingsOutlined,
} from "@mui/icons-material";
import { sidebarListItems } from "sidebarItems";
import FlexBetween from "components/FlexBetween/FlexBetween";
import profileImage from "assets/avatar.png";

const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpened,
  toggleSidebar,
}) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActiveSidebarItem(pathname.substring(1));
  }, [pathname]);

  const onSidebarItemClick = (text) => {
    navigate(`/${text.toLowerCase()}`);
    setActiveSidebarItem(text.toLowerCase());
  };

  return (
    <Box>
      {isSidebarOpened && (
        <Drawer
          open={isSidebarOpened}
          onClose={toggleSidebar}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.75rem 2rem 1.75rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={toggleSidebar}>
                    <ChevronLeft sx={{ fontSize: "25px" }} />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {sidebarListItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "1.25rem 0 0.5rem 3.5rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => onSidebarItemClick(text)}
                      sx={{
                        background:
                          activeSidebarItem === text.toLowerCase()
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          activeSidebarItem === text.toLowerCase()
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1.5rem",
                          color:
                            activeSidebarItem === text.toLowerCase()
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text}>
                        {activeSidebarItem === text.toLowerCase() && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween m="1rem" gap="0.5rem">
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
                    fontSize: "0.55rem",
                    textAlign: "left",
                    color: theme.palette.secondary[200],
                  }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <IconButton>
                <SettingsOutlined />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
