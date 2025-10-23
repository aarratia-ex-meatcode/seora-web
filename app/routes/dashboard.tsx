import DashboardLayout from "../features/dashboard/layout"
import Users from "../features/dashboard/pages/users"

export default [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "users", element: <Users /> },
    ],
  },
]
