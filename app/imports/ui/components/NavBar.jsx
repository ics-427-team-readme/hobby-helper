import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', background: '#6FD68B' };
    return (
      <Menu style={menuStyle} attached="top" borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1'>Hobby Helper</Header>
        </Menu.Item>
        {this.props.currentUser && this.props.currentUser !== 'admin@foo.com' ? (
            [
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>Hobby List</Menu.Item>,
            ]
        ) : ''}
        <Menu.Item as={NavLink} id='about' activeClassName="active" exact to="/about" key='about'>About</Menu.Item>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} id='userlist' activeClassName="active" exact to="/userList" key='userList'>Users</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} id='hobbylists' activeClassName="active" exact to="/adminHobbyList" key='hobbyLists'>Hobby Lists</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} id='hobbyitems' activeClassName="active" exact to="/adminHobbyItemList" key='hobbyItems'>Hobby Items</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-profile" icon="sign out" text="Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
