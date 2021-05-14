import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import { useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import { LoginUser } from "../Redux/Actions/actionsUsers.js"
import md5 from "md5"
import Cookies from "universal-cookie"

function SignInSide({ LoginUser, userLogged, error, loading }) {
  const classes = useStyles()
  const cookie = new Cookies()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  let history = useHistory()

  const logged = cookie.get("id")

  useEffect(() => {
    if (userLogged.id) {
      cookie.set("id", userLogged.id, { path: "/" })
      cookie.set("name", userLogged.name, { path: "/" })
      cookie.set("lastname", userLogged.lastName, { path: "/" })
      cookie.set("email", userLogged.email, { path: "/" })
      cookie.set("email", userLogged.email, { path: "/" })
      cookie.set("dni", userLogged.dni, { path: "/" })
      history.push("/users")
    }
  }, [userLogged])

  useEffect(() => {
    if (logged) history.push("/users")
  }, [logged])

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (values) {
      const hashPassword = md5(values.password)
      LoginUser(values.email, hashPassword)
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error ? <p>There was an error. Please try again </p> : null}
          {loading ? <p>Loading...</p> : null}

          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => submitForm(e)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  userLogged: state.userLogged,
  error: state.error,
  redirect: state,
})

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (email, pass) => dispatch(LoginUser(email, pass)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide)

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
