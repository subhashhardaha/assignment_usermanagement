import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});





function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];




const columns = [
  { id: 'id', label: 'Id', maxWidth: 0 },
  { id: 'user_name', label: 'user_name', minWidth: 170 },
  {
    id: 'role', label: 'role', minWidth: 100, format: (value) => value.map(function (item) {
      return item['role_name'];
    }),
  },




];


class UserList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0, rowsPerPage: 10,
      iserror: false,
      errorMsgs: [],
      data: [],
      open:false

    }
    this.handleRowDelete = this.handleRowDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);


  }

  handleRowDelete = (idd) => {
    console.log('Click Delete happened', idd);

    fetch("http://127.0.0.1:8000/api/user/" + idd + "/", {
      method: 'DELETE',
    })
      .then(res => {
        const dataDelete = this.state.data;
        var index = dataDelete.map(e => e.id).indexOf(idd)
        if (index !== -1) {
          dataDelete.splice(index, 1);
          this.setState({data: dataDelete});
        }

      })
      .catch(error => {
        console.log("Error")

      })
    
    this.handleClose()
  }

  componentDidMount() {
    console.log("componentDidMount")

    fetch("http://127.0.0.1:8000/api/user/")
      .then(res => res.json())
      .then((d) => {
        console.log("data")
        console.log(d)
        this.setState({ data: d.results })
      })
      .catch(error => {
        console.log("Error")
      })

  }
  handleChangePage = (event, newPage) => {
    this.setState({ newPage: newPage });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // handleClickUser = (id) => {
  //   this.props.action('useredit',id)
  // };


  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value })
    this.setState({ page: 0 })
  };
  render() {
    const { classes, theme } = this.props
    const { page, rowsPerPage, data,open } = this.state
    { console.log(data) }
    { console.log(rowsPerPage, page) }
    return (

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container justify='space-between' >
            <TextField size="small" variant="outlined" />

            <Button size="small" variant="contained" color="primary" onClick={()=>this.props.action('useradd')} >
              Add User
            </Button>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log(row)
                    console.log(row.id)

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} onClick={()=>this.props.action('useredit',row.id)}>
                              {column.format ? column.format(value) : value}

                            </TableCell>
                          );
                        })}
                        <TableCell key={row.id} align={'right'}>
                          <IconButton aria-label="delete" size="small" onClick={()=>this.handleRowDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                          {/* <Dialog
                            open={open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Delete {row.user_name}?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                              <Button onClick={() => this.handleRowDelete(row.id)} color="primary" autoFocus>
                                Delete
                            </Button>
                            </DialogActions>
                          </Dialog>*/}
                        </TableCell> 


                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>



    )
  }

}

export default withStyles(useStyles, { withTheme: true })(UserList);










