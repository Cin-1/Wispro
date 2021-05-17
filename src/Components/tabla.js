import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { lighten, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import { Box, Button } from "@material-ui/core"
import { connect } from "react-redux"
import { GetAllUsers, DeleteUser } from "../Redux/Actions/actionsUsers"
import FormDialog from "./ModalEdit"
import Swal from "sweetalert2"
import ModalNewUser from "./ModalNewUser"
import NavBar from "./NavBar"
import Chart from "./modalChart"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "lastName", numeric: true, disablePadding: false, label: "LastName" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "dni", numeric: true, disablePadding: false, label: "DNI" },
  { id: "address", numeric: true, disablePadding: false, label: "Address" },
  { id: "Edit", numeric: true, disablePadding: false, label: "Edit" },
  { id: "Delete", numeric: true, disablePadding: false, label: "Delete" },
  { id: "Info", numeric: true, disablePadding: false, label: "Info" },
]

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort } =
    props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <>
      <TableHead style={{ marginTop: "20px" }}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align="right">
            <ModalNewUser />
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "50px",
    marginLeft: "5px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    marginTop: "30px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
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

function EnhancedTable({ users, GetAllUsers, loading, error, DeleteUser }) {
  const classes = useStyles()
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("calories")
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    GetAllUsers()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.len - page * rowsPerPage)

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
    <>
      <NavBar />

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={users.leng}
              />
              <TableBody>
                {stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    return (
                      <TableRow>
                        <TableCell
                          component="th"
                          id={user.id}
                          scope="user"
                          padding="none"
                        >
                          {user.name}
                        </TableCell>
                        <TableCell align="right">{user.lastName}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.adress}</TableCell>
                        <TableCell align="right">{user.dni}</TableCell>
                        <TableCell align="right">
                          <FormDialog user={user} />
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => deleteUserId(user.id)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Chart user={user} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable)
