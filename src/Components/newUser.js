import React, { useState } from "react"
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
import { connect } from "react-redux"
import { CreateNewUser } from "../Redux/Actions/actionsUsers.js"
import md5 from "md5"

const NewUser = ({ CreateNewUser, loading, error, redirect, handleClose }) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: "",
    name: "",
    lastName: "",
    dni: 0,
    password: "",
    adress: "",
  })

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  let history = useHistory()

  const submitForm = (e) => {
    e.preventDefault()
    if (values.email && values.lastName && values.name) {
      CreateNewUser(values)
    }
    if (window.location.pathname === "/users") {
      handleClose()
    }
    if (redirect.redirect && window.location.pathname !== "/users") {
      history.push("/")
    } else return
  }
  return (
    <form className={classes.form} noValidate onSubmit={(e) => submitForm(e)}>
      {loading.loading ? <p>Loading...</p> : null}

      {error.error ? <p>There was an error. Please try again </p> : null}
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
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={values.name}
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastname"
        label="Lastname"
        name="lastName"
        autoComplete="lastname"
        autoFocus
        value={values.lastName}
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="DNI"
        label="DNI"
        name="dni"
        autoComplete="DNI"
        autoFocus
        type="number"
        value={values.dni}
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="adress"
        label="Adress"
        name="adress"
        autoComplete="adress"
        autoFocus
        value={values.adress}
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
        Send
      </Button>
    </form>
  )
}
const mapStateToProps = (state) => ({
  loading: state,
  error: state,
  redirect: state,
})

const mapDispatchToProps = (dispatch) => ({
  CreateNewUser: (values) => dispatch(CreateNewUser(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
