import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import EditIcon from "@material-ui/icons/Edit"
import { makeStyles } from "@material-ui/core/styles"
import userEvent from "@testing-library/user-event"
import { connect } from "react-redux"
import InfoIcon from "@material-ui/icons/Info"
import { EditUser } from "../Redux/Actions/actionsUsers.js"
import { LineChart, Tooltip, Line, CartesianGrid, XAxis, YAxis } from "recharts"

function Chart({ user, error, loading }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Button onClick={handleClickOpen}>
        <InfoIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {error ? <p>There was an error. Please try again </p> : null}
          {loading ? <p>Loading </p> : null}
          <Typography variant="h2">Daily Access: {user.name}</Typography>{" "}
          <Box pr={6} className={classes.root}>
            <LineChart
              stroke="#F1F2F3"
              width={400}
              height={250}
              data={user.access}
            >
              <Line dataKey="daily access" stroke="#000000" />
              <CartesianGrid stroke="#5176C7" strokeDasharray="5 5" />
              <XAxis dataKey="name" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip stroke="#000000" />
            </LineChart>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart)

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: "50px",
    marginLeft: "5px",
  },
}))
