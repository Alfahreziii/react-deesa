// components/UserList.tsx
import { useEffect, useState } from "react";
import { fetchUsers, GetUsersResponse } from "../api/userService";
import { User } from "../types/user";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
const loadUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token not found, please login");
      setLoading(false);
      return;
    }
    const data: GetUsersResponse = await fetchUsers(token);
    console.log("API response data:", data);
    if (!data.data) {
      setError("No users data found");
      setUsers([]); // pastikan tetap array
    } else {
      setUsers(data.data);
    }
  } catch (err: any) {
    setError(err.message || "Failed to fetch users");
  } finally {
    setLoading(false);
  }
};



    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
