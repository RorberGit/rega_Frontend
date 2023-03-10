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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AccountCircle,
  Person,
  Business,
  Password,
  Logout,
} from "@mui/icons-material";

import style from "../styles/head.module.css";

export default function Head() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton aria-label="menu" color="inherit">
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Typography
                  sx={{
                    mr: 2,
                    display: { xs: "block", sm: "flex", md: "flex" },
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
                    <Link component={LinkRouter} to="/rega" className="linkapp">
                      Rega
                    </Link>
                  </Box>
                  <Box className="boxlink">
                    <Link component={LinkRouter} to="/users" className={style.link}>
                      Usuarios
                    </Link>
                  </Box>
                  <Box className="boxlink">
                    <Link component={LinkRouter} to="/units" className={style.link}>
                      Unidades
                    </Link>
                  </Box>
                  <Box className="boxlink">
                    <Link component={LinkRouter} to="/procdest" className={style.link}>
                      Procedencia o Destino
                    </Link>
                  </Box>
                  <Box className="boxlink">
                    <Link
                      component={LinkRouter}
                      to="/About"
                      className="linkapp"
                    >
                      About
                    </Link>
                  </Box>
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 0, display: "inline-flex" }}>
                <IconButton aria-label="acount" onClick={handleClick}>
                  <AccountCircle sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  id="MenuUsers"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Person sx={{ mr: 2 }} /> Rorber Rodr??guez Arcaya
                  </MenuItem>
                  <MenuItem>
                    <Business sx={{ mr: 2 }} /> UBI Ram??n de Antilla
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Password sx={{ mr: 2 }} /> Cambiar Contrase??a
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Logout sx={{ mr: 2 }} /> Cerrar Sesi??n
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}
