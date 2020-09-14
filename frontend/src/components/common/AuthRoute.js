/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const AuthRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <div>Loading...</div>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to={{
            pathname: '/login',
          state: { from: props.location}}}/>;
        } else {
          <Component {...props}/>
        }
      }}
    />
  );

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthRoute);