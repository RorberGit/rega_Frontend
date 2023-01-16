import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as LinkRouter,
} from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Link,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import "./App.css";
import "antd/dist/antd.min.css";

import About from "./pages/About/About";
import Users from "./pages/Users";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <IconButton aria-label="menu" color="inherit">
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Box className="boxlink">
                      <Link component={LinkRouter} to="/" className="linkapp">
                        Inicio
                      </Link>
                    </Box>
                    <Box className="boxlink">
                      <Link
                        component={LinkRouter}
                        to="/Users"
                        className="linkapp"
                      >
                        Rega
                      </Link>
                    </Box>
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 0, display: "inline-flex" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    LOGO
                  </Typography>
                  <IconButton aria-label="acount">
                    <AccountCircle sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blog/:slug" element={<Blog />}></Route>
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
