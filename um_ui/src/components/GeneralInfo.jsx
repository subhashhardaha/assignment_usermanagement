import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textField1: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  menu: {
    width: 200,
  },
});


class GeneralInfo extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      description: '',
    };


  }
  componentWillReceiveProps(props) {
    if (props.user_data)
    {
      const {user_name,first_name,last_name,description}=props.user_data
      this.setState({
        user_name: user_name,
        first_name: first_name,
        last_name: last_name,
        description: description, 
      })
    }
    
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="user_name"
          label="Userame"
          required
          className={classes.textField}
          value={this.state.user_name}
          onChange={this.handleChange('user_name')}
          margin="normal"
        />

        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="first_name"
          label="First Name"
          className={classes.textField}
          value={this.state.first_name}
          onChange={this.handleChange('first_name')}
          margin="normal"
        />

        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="last_name"
          label="Last Name"
          required
          className={classes.textField}
          value={this.state.last_name}
          onChange={this.handleChange('last_name')}
          margin="normal"
        />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="description"
          label="Description"
          className={classes.textField1}
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin="normal"
          fullWidth
        />

      </form>
    );
  }
}

GeneralInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralInfo);