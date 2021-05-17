import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from "react-router-dom"
import Cookies from "universal-cookie"
import { withStyles } from "@material-ui/core/styles"
import { MenuItem, Menu, Box } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle"



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
  root: {
    display: "flex",
    justifyContent: "space-around",

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    minWidth: '400px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElP, setAnchorElP] = useState(null)

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

  let history = useHistory()
  const cookie = new Cookies()
  const logged = cookie.get("name")

  const open = Boolean(anchorEl)

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
    <div >
      <AppBar position="static">
      <Box display="flex">
        <Toolbar >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon/>
          </IconButton>
          {logged ? <Typography style={{marginLeft:"240px"}}>{`Hello ${logged}!`}</Typography> : null}

          <div className={classes.search} style={{marginLeft:"140px"}}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Box alignItems="flex-end">
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorElP}
            keepMounted
            open={Boolean(anchorElP)}
            onClose={handleClose}
          ></StyledMenu>
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
            <MenuItem onClick={handleCloseLogin}></MenuItem>
            <MenuItem onClick={(handleCloseLogin, handleLogout)}>
              Logout
            </MenuItem>
          </Menu>
          </Box>
        </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}



  
      
          
