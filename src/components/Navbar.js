import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, useMediaQuery, useTheme, } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "./DrawerComp";
import logo from "../assets/navlogo.jpg";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const logout = async () => {
    await localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (

    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <AppBar position="float" sx={{ background: "#ffffff" }}>
            <Toolbar>
              {isMatch ? (
                <>
                  <img className="img" src={logo} alt="" />
                  <Drawer />
                </>
              ) : (
                <>
                  <img className="img" src={logo} alt="" />

                  <Tabs
                    sx={{ marginLeft: "auto" }}
                    textColor="primary"
                    value={value}
                    onChange={(e, value) => setValue(value)}
                    indicatorColor="secondary"
                  >
                    <Tab component={Link} to={"home"} label="Home" />
                    <Tab component={Link} to={"templates"} label="Templates" />
                    <Tab component={Link} to={"about"} label="About" />
                    <Tab component={Link} to={"/"} label="Logout" onClick={logout} />
                  </Tabs>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
