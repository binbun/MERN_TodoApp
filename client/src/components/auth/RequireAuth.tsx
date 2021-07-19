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

// export const IsUserLogged = (ComponentDirect: any, ComponentRedirect: any) => {
//   return (props: any) => {
//     const user: User = JSON.parse(localStorage.getItem('user')!);

//     if(!user) {
//       window.location.href = `/`
//     }

//     if (user.isAdmin) {
//       window.location.href = `/${ComponentRedirect}`
//     }
//     return <ComponentDirect {...props} />
//   }
// }

// export const IsAdminLogged = (ComponentDirect: any, ComponentRedirect: any) => {
//   return (props: any) => {
//     const user: User = JSON.parse(localStorage.getItem('user')!);

//     if(!user) {
//       window.location.href = `/`
//     }

//     if (!user.isAdmin) {
//       window.location.href = `/${ComponentRedirect}`
//     }
//     return <ComponentDirect {...props} />
//   }
// }

// export const IsLogged = (ComponentDirect: any, ComponentRedirect: any) => {
//   return (props: any) => {
//     const user: User = JSON.parse(localStorage.getItem('user')!);

//     if (!user) {
//       window.location.href = `/${ComponentRedirect}`
//     }
//     return <ComponentDirect {...props} />
//   }
// }


