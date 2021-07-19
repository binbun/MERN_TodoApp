import React from "react";

export const RequireAuth = (Component: React.FC) => {
  return (props: any) => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/'
    }
    return <Component {...props} />
  }
}

export const IsLogged = (ComponentDirect: any, ComponentRedirect: any) => {
  return (props: any) => {
    const token = localStorage.getItem('token');

    if (token) {
      window.location.href = `/${ComponentRedirect}`
    }
    return <ComponentDirect {...props} />
  }
}

