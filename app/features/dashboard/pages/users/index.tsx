import { useState } from "react";
import { useUsers } from "@/features/dashboard/hooks/use-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DashboardUsers() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUsers({ first: 10, page });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  const users = data?.data || [];
  const pageInfo = data?.paginatorInfo || {};

  const handlePrev = () => {
    if (pageInfo.currentPage > 1) setPage(pageInfo.currentPage - 1);
  };

  const handleNext = () => {
    if (pageInfo.currentPage < pageInfo.lastPage)
      setPage(pageInfo.currentPage + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <p className="text-gray-700 mb-6">
        Here you can view performance and system users.
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roles.join(", ")}</TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-6">
        <Button onClick={handlePrev} disabled={pageInfo.currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {pageInfo.currentPage} of {pageInfo.lastPage} — Total{" "}
          {pageInfo.total}
        </span>
        <Button
          onClick={handleNext}
          disabled={pageInfo.currentPage === pageInfo.lastPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
