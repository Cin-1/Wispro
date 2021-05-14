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
import NewUser from "./newUser.js"
import AddIcon from "@material-ui/icons/Add"
import IconButton from "@material-ui/core/IconButton"

function ModalNewUser() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <IconButton styles={{ color: "white" }} onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <NewUser handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  error: state,
})

const mapDispatchToProps = (dispatch) => ({
  EditUser: (id, values) => dispatch(EditUser(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewUser)
