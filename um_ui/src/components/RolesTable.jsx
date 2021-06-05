import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';





const headCells = [
  // { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'role_name', numeric: false, disablePadding: false, label: 'Role Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Roles' },

];



function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
              {headCell.label}
              
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
 
  onSelectAllClick: PropTypes.func.isRequired,

  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
});

const EnhancedTableToolbar = (props) => {
  const classes = withStyles(useToolbarStyles);
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {/* {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : ( */}
        <Typography className={classes.title} id="tableTitle" component="div">
          Select Roles From List Below <b> {numSelected} selected </b>
        </Typography>

      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

class RolesTable extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selected:[],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      user_rows:{role:[]},
      all_roles:[]
    }
    
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this); 
    this.handleChangeDense=this.handleChangeDense.bind(this);
    this.isSelected=this.isSelected.bind(this);
}
  componentDidMount()
  {
    console.log('componentDidMount Role')
    // const newSelecteds = this.state.user_rows.role.map((n) => n.id);
    // this.setState({selected:newSelecteds});
  }

  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps Role')
    var user_data=props.user_data
    if (typeof user_data === 'undefined' || user_data === null)
    {
      user_data={role:[]}
    }
    this.setState({
      user_rows: user_data,
    });

    this.setState({
      all_roles: props.user_roles,
    });
    console.log('componentWillReceiveProps Role',user_data)
    const newSelecteds = user_data.role.map((n) => n.id);
    this.setState({selected:newSelecteds});
  }


   handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.all_roles.map((n) => n.id);
      this.setState({selected:newSelecteds});
      return;
    }
    this.setState({selected:[]});
  };

   handleClick = (event, name) => {
    console.log("handleClick",event, name)
    const selected=this.state.selected;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected:newSelected});
  };

   handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

   handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)});
    this.setState({page:0});
  };

  handleChangeDense = (event) => {
    this.setState({dense:event.target.checked});
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;
  render(){
      const { classes, theme } = this.props
      const { rowsPerPage, page,selected,dense,user_rows,all_roles } = this.state

      const emptyRows = rowsPerPage - Math.min(rowsPerPage, all_roles.length - page * rowsPerPage);
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
    
                  onSelectAllClick={this.handleSelectAllClick}
    
                  rowCount={all_roles.length}
                />
                <TableBody>
                  {all_roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = this.isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
    
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.id}
                          </TableCell> */}
                          <TableCell align="left">{row.role_name}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">{row.role.map(function (item) {
                                                        return item['name']+', ';
                                                    })}</TableCell>
                        </TableRow>
                      );
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
              count={all_roles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={this.handleChangeDense} />}
            label="Dense padding"
          />
        </div>

    )
  }
  
}

export default withStyles(useStyles, { withTheme: true })(RolesTable);
