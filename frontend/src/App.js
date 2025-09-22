import { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <div>
      <h1>Dashboard (React)</h1>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;