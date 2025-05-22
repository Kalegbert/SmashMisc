export default function AdminPage({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Page</h2>
      <p>Hello, {user.username}. You have admin access.</p>
    </div>
  );
}
