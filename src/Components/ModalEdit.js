import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import EditIcon from "@material-ui/icons/Edit"
import userEvent from "@testing-library/user-event"
import { connect } from "react-redux"
import { EditUser } from "../Redux/Actions/actionsUsers.js"

function FormDialog({ user, EditUser, error, loading }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [values, setValues] = useState({
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    adress: user.adress,
  })

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const submitForm = (e) => {
    e.preventDefault()

    if (values.email && values.lastName && values.name) {
      EditUser(user.id, values)
      handleClose()
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          {error ? <p>There was an error. Please try again </p> : null}
          {loading ? <p>Loading </p> : null}

          <form noValidate onSubmit={(e) => submitForm(e)}>
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
              id="adress"
              label="Adress"
              name="adress"
              autoComplete="adress"
              autoFocus
              value={values.adress}
              onChange={handleInputChange}
            />

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
  loading: state.loading,
})

const mapDispatchToProps = (dispatch) => ({
  EditUser: (id, values) => dispatch(EditUser(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
