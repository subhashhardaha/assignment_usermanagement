import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
import RolesTable from './RolesTable';
import GeneralInfo from './GeneralInfo'




const user_rows1 = {"id":23,"user_name":"admin111","first_name":"","last_name":"admin111","description":"","role":[{"id":2,"role_name":"Shell Accounts","description":"Account that have shell access","role":[{"id":5,"name":"Shell (Non CLI) Access"}]}],"all_roles":[{"id":1,"role_name":"Security Administrator Viewer","description":"Security Administrator Viewer Role","role":[{"id":1,"name":"Cloud Gateway Viewer"},{"id":2,"name":"Security Viewer"},{"id":3,"name":"Appliance CLI Viewer"},{"id":4,"name":"Appliance Web Viewer"}]},{"id":2,"role_name":"Shell Accounts","description":"Account that have shell access","role":[{"id":5,"name":"Shell (Non CLI) Access"}]}]}


const useStyles = (theme) => ({
   
    button: {
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

    flex: '1 1 100%',
});


const columns = [
    { id: 'id', label: 'Id', maxWidth: 0, hidden: true },
    { id: 'name', label: 'Role Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 200 },

    {
        id: 'role', label: 'Roles', minWidth: 100, format: (value) => value.map(function (item) {
            return item['role_name'];
        }),
    },

];


class UserAddUpdate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0, rowsPerPage: 10,
            iserror: false,
            errorMsgs: [],
            user_info: undefined,
            user_roles:[],
            open: false

        }
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        


    }

    handleAddNewUser = () => {
        console.log('handleAddNewUser');
        const roletable=this.roletable.state
        const generalinfo=this.generalinfo.state
        const post_data=generalinfo
        post_data["role"]=roletable.selected


        fetch('http://127.0.0.1:8000/api/user/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
          })
            .then(
                res => {
                    {
                        
                        if (!res.ok) {
                            throw new Error(res);
                        }
                        return res.json();
                    }
                })
            .then((d) => {
                console.log("data_resp")
                console.log(d)
                this.props.action('userlist')
                this.setState({ user_roles: d.results })
            })
            .catch(error => {
                alert(error)
                console.log("Error",error)
            })

    }
    handleUpdateUser = () => {
        console.log('handleUpdateUser ');
        const user_id=this.state.user_info.id

        const roletable=this.roletable.state
        const generalinfo=this.generalinfo.state
        const post_data=generalinfo
        post_data["role"]=roletable.selected
        console.log(user_id)
    
        fetch('http://127.0.0.1:8000/api/user/'+user_id+'/', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
          })
            .then(
                res => {
                    {
                        if (!res.ok) {
                            throw new Error(res);
                        }
                        return res.json();
                    }
                })
            .then((d) => {
                console.log("data_resp")
                console.log(d)
                this.props.action('userlist')
                this.setState({ user_roles: d.results })
            })
            .catch(error => {
                alert(error)
                console.log("Error",error)
            })
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
                    this.setState({ data: dataDelete });
                }

            })
            .catch(error => {
                console.log("Error")

            })

        this.handleClose()
    }

    componentDidMount() {
        console.log("componentDidMount")

            console.log(this.props)
            // roles
            fetch("http://localhost:8000/api/userrole/")
            .then(res => res.json())
            .then((d) => {
                console.log("data")
                console.log(d)
                this.setState({ user_roles: d.results })
            })
            .catch(error => {
                console.log("Error")
            })

            if (this.props.user_id){
                fetch("http://localhost:8000/api/user/"+this.props.user_id+"/")
                .then(res => res.json())
                .then((d) => {
                    console.log("componentDidMount_data")
                    console.log(d)
                    this.setState({ user_info: d })
                })
                .catch(error => {
                    console.log("Error")
                })
    
    
            }

    }
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps")
        if (props.user_id){
            fetch("http://localhost:8000/api/user/"+props.user_id+"/")
            .then(res => res.json())
            .then((d) => {
                console.log("data")
                console.log(d)
                this.setState({ user_info: d.results })
            })
            .catch(error => {
                console.log("Error")
            })


        }
        

    
            // roles
            
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

    render() {
        const { classes, theme } = this.props
        const { page, rowsPerPage, user_info, open } = this.state
        { console.log(user_info) }
        { console.log(rowsPerPage, page) }
        return (

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1} justify='space-between' >
                      <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                      {this.props.action_name}
                          </Typography>
                        <div>
                            <Button className={classes.button} size="small" variant="contained" color="primary" onClick={() => this.props.action('userlist')}>
                        Cancel
                        </Button>
                            <Button className={classes.button} size="small" variant="contained" color="primary" onClick={this.props.action_name=="Add User"?this.handleAddNewUser:this.handleUpdateUser}>
                            {this.props.action_name === "Edit User"?"Update User":this.props.action_name}
                        </Button>

                        </div>

                    </Grid>

                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.root}>
                    <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="general-info"
                                id="general-info"
                            >
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    General Info
                                    </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <GeneralInfo  ref={ref => (this.generalinfo = ref)} user_data={this.props.action_name=='Add User'?undefined:user_info}>
                                    
                                </GeneralInfo>
                            </AccordionDetails>
                        </Accordion>
                       
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="role-details"
                                id="role-details"
                            >
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Roles
                                    </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <RolesTable ref={ref => (this.roletable = ref)} user_roles={this.state.user_roles} user_data={this.props.action_name=='Add User'?undefined:user_info}/>
                            </AccordionDetails>
                        </Accordion>
                       
                    </Paper>
                </Grid>
            </Grid>



        )
    }

}

export default withStyles(useStyles, { withTheme: true })(UserAddUpdate);










