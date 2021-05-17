import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

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


export default ModalNewUser
