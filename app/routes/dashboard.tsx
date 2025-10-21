import DashboardLayout from "../features/dashboard/layout"
import Users from "../features/dashboard/pages/users/index"

export default [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "users", element: <Users /> },
    ],
  },
]
