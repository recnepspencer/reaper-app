// app/users/page.tsx

import { getAllUsers } from "@/lib/services/userService";
import { User } from '@/lib/interfaces/user.interface';

// Define the page component as an async function
export default async function UsersPage() {
  // Fetch data directly in the component
  const users: User[] = await getAllUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name ? user.name : 'No Name'}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
