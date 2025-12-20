**Admin Panel**
 ##Developer Rizwan Ahmed##
this repo is build to develop and self learn regaring the Admin Pamel

/**Admin Section**/
Admin Panel --> for Routing
    only routing
Admin Layout --> layout
    slider
    Topbar
    <Outlier/>
Pages
    AdminDashboard
        State
        Welcome message
    AdminUser
        Fetch User
        Assign roles
        Delete/Update
    AdminSidebar
        navigation
    Dashboard ((ROLE DECIDER ONLY))
        Only redirect

App.tsx
 └── /dashboard (Protected)
      ├── /admin (RoleGuard: admin)
      │     ├── layout
      │     ├── dashboard
      │     ├── users
      │     ├── roles
      │     └── settings
      │
      └── /user (RoleGuard: user)
            └── user dashboard

/**User Section**/


**issue
when I login through user http://localhost:3000/dashboard/user/dashboard this link open
and when i logout http://localhost:3000/dashboard with blank page and after this i have to do undo on the browser top left  button