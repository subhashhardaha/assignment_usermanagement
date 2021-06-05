import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserList from './UserList';
import UserAddUpdate from './UserAddUpdate'

const useStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class UserDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      view:'userlist',
      user_id:undefined
    };
  }

  handleView=(v,i)=>{
    console.log('handleView',v,i);
    if ((v=='useredit') && (i==undefined))
    {
      
    }
    else{
      this.setState({
        view: v
      });
      this.setState({
        user_id: i
      });

    }
    

}

  handleDrawerOpen = () => {
    this.setState({
      open: true
    })
  };
  handleDrawerClose = () => {
    this.setState({
      open: false
    })
  };


  render() {
    const { classes, theme } = this.props
    const { open } = this.state
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              {this.state.view == 'userlist'  &&
              <UserList action={this.handleView}></UserList>}
              {this.state.view == 'useradd'  &&
              <UserAddUpdate action={this.handleView} action_name='Add User'></UserAddUpdate>}
              {this.state.view == 'useredit'  &&
              <UserAddUpdate action={this.handleView} user_id={this.state.user_id} action_name='Edit User'></UserAddUpdate>}
            </Paper>
          </Grid>
        </Grid>

      </Container>

    );
  }

}

export default withStyles(useStyles, { withTheme: true })(UserDashboard);

