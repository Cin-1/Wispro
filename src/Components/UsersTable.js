import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { Typography, Box, Button } from "@material-ui/core"
import { connect } from "react-redux"
import { GetAllUsers, DeleteUser } from "../Redux/Actions/actionsUsers"
import DeleteIcon from "@material-ui/icons/Delete"
import InfoIcon from "@material-ui/icons/Info"
import FormDialog from "./ModalEdit"
import Swal from "sweetalert2"
import ModalNewUser from "./ModalNewUser"
import NavBar from "./NavBar"

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  subtitle: {
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-around",
  },
  cells: {
    color: "white",
  },
  row: {
    "&:hover": {
      backgroundColor: "rgb(245,245,245)",
    },
  },
}))

function Users({ users, GetAllUsers, loading, error, DeleteUser }) {
  const classes = useStyles()

  const [listUsers, setListUsers] = useState(null)

  useEffect(() => {
    GetAllUsers()
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
      <NavBar />
      <Box ml={2} mt={10}>
        <Typography variant="h4">Recent Users</Typography>
      </Box>
      <Box className={classes.subtitle} ml={2} mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Typography variant="h6">Filters</Typography>
        <Typography variant="h6">Filters</Typography>

        {loading.loading ? <p>Loading...</p> : null}
        {error.error ? <p>Error loading users </p> : null}
      </Box>
      {!users ? null : (
        <Table size="small">
          <TableHead
            style={{ backgroundColor: "rgb(81, 118, 199)", color: "white" }}
          >
            <TableRow>
              <TableCell className={classes.cells}>Name</TableCell>
              <TableCell className={classes.cells}>LastName</TableCell>
              <TableCell className={classes.cells}>Email</TableCell>
              <TableCell className={classes.cells}>DNI</TableCell>

              <TableCell className={classes.cells}>Address</TableCell>
              <TableCell className={classes.cells}>Edit</TableCell>
              <TableCell className={classes.cells}>Delete</TableCell>
              <TableCell className={classes.cells}>Info</TableCell>
              <TableCell>
                <ModalNewUser />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={classes.row}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.adress}</TableCell>
                <TableCell>{user.dni}</TableCell>
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
