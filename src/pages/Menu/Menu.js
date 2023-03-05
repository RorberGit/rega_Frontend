import React from "react";

import { Link as LinkRouter } from "react-router-dom";

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

function Menu() {
  return (
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
                      to="/RegRega"
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
    </div>
  );
}

export default Menu;
