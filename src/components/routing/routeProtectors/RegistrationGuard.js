import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

export const RegistrationGuard = () => {
  if (localStorage.getItem("token")) {
    
    return <Outlet />;
  }
  
  return <Navigate to="/game" replace />;
};

RegistrationGuard.propTypes = {
  children: PropTypes.node
}