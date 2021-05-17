import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import { AppBar, ListItemIcon, ListItemText } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import AccountBoxSharpIcon from "@material-ui/icons/AccountBoxSharp"
import FilterNoneSharpIcon from "@material-ui/icons/FilterNoneSharp"
import HelpOutlineSharpIcon from "@material-ui/icons/HelpOutlineSharp"
import { withStyles } from "@material-ui/core/styles"
import Cookies from "universal-cookie"
import { useHistory } from "react-router-dom"

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem)

const useStyles = makeStyles((theme) => ({
  tittle1: {
    flexGrow: 1,
  },
}))

const NavBar = (theme) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElP, setAnchorElP] = useState(null)

  let history = useHistory()
  const cookie = new Cookies()
  const logged = cookie.get("name")

  const open = Boolean(anchorEl)

  const [abrir, setAbrir] = useState(false)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClick = (event) => {
    setAnchorElP(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElP(null)
  }

  const handleCloseLogin = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    cookie.remove("id", { path: "/" })
    cookie.remove("name", { path: "/" })
    cookie.remove("lastname", { path: "/" })
    cookie.remove("email", { path: "/" })
    cookie.remove("email", { path: "/" })
    cookie.remove("dni", { path: "/" })
    history.push("/")
  }

  return (
    <div>
      <AppBar className="navbar">
        <Toolbar>
          {logged ? <Typography>{`Hello ${logged}!`}</Typography> : null}

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorElP}
            keepMounted
            open={Boolean(anchorElP)}
            onClose={handleClose}
          >
            {" "}
          </StyledMenu>
          <Typography></Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleCloseLogin}
          >
            <MenuItem onClick={(handleCloseLogin, handleLogout)}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
