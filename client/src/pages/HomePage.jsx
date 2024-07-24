import UserTable from "../components/UserTable";

export default function HomePage() {
  return (
    <div className='container mt-4'>
      <h2>User List</h2>
      <UserTable />
    </div>
  );
}
