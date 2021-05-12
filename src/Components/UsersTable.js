import React, { useEffect, useState } from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { Typography, Button, FormControlLabel } from "@material-ui/core"
import { connect } from "react-redux"
import { GetAllUsers, DeleteUser } from "../Redux/Actions/actionsUsers"
import DeleteIcon from "@material-ui/icons/Delete"
import InfoIcon from "@material-ui/icons/Info"
import Dialog from "@material-ui/core/Dialog"
import ModalEdit from "./ModalEdit"
import FormDialog from "./ModalEdit"
import Swal from "sweetalert2"

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

function Users({ users, GetAllUsers, loading, error, DeleteUser }) {
  const classes = useStyles()

  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    GetAllUsers()
    setListUsers(users)
  }, [])
  const deleteUserId = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteUser(id)
      }
    })
  }
  return (
    <React.Fragment>
      <Typography>Recent Users</Typography>
      {loading.loading ? <p>Loading...</p> : null}
      {error.error ? <p>Error loading users </p> : null}
      {listUsers.lenght === 0 ? null : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DNI</TableCell>

              <TableCell align="right">Address</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.adress}</TableCell>
                <TableCell align="right">{user.dni}</TableCell>
                <TableCell>
                  <FormDialog user={user} />
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteUserId(user.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button>
                    <InfoIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  users: state.users,
  loading: state,
  error: state,
})

const mapDispatchToProps = (dispatch) => ({
  GetAllUsers: () => dispatch(GetAllUsers()),
  DeleteUser: (id) => dispatch(DeleteUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
