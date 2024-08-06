import * as React from "react";
import { Link, Form, useRouteLoaderData } from "react-router-dom";
import Logout from "../Pages/Auth/Logout";
import NavLink from "./NavLink";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router-dom";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import WorkOutlineSharpIcon from "@mui/icons-material/WorkOutlineSharp";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import logo from "../assets/Synclogo1.png";
const drawerWidth = 200;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default, // Set the background color
  borderRight: "none", // Remove the border
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.background.default, // Set the background color
  borderRight: "none", // Remove the border
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainNavigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const token = useRouteLoaderData("root");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-background flex h-full min-h-screen">

      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-gray">
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <ChevronRightIcon className="w-10 h-10 text-lightgray transition duration-500 ease-in-out transform hover:scale-150  hover:text-white" />
          </IconButton>
          <div variant="h6">search bar here</div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="bg-gray ">
          <img src={logo} className="w-15 h-10 mr-10" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon className="w-10 h-10 text-lightgray transition duration-500 ease-in-out transform hover:scale-150 hover:text-white" />
            )}
          </IconButton>
          <Divider />
        </DrawerHeader>

        <List className="bg-background h-screen">
          {token && (
            <nav className="pl-6 h-full ">
              <ul className="flex flex-col h-full space-y-20">
                <li className="">
                  <NavLink
                    to="statistics"
                    Icon={AutoGraphOutlinedIcon}
                    open={open}
                  />
                </li>
                <li className="">
                  <NavLink
                    to="projects"
                    Icon={WorkOutlineSharpIcon}
                    open={open}
                  />
                </li>
                <li className="">
                  <NavLink
                    to="Employees"
                    Icon={EngineeringOutlinedIcon}
                    open={open}
                  />
                </li>
                <li className="">
                  <NavLink
                    to="clients"
                    Icon={SwitchAccountOutlinedIcon}
                    open={open}
                  />
                </li>

                <li>
                  <Logout Icon={LogoutSharpIcon} open={open} />
                </li>
                {!token && (
                  <li>
                    <Form action="/auth">
                      <button>Log in</button>
                    </Form>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </div>
  );
}
