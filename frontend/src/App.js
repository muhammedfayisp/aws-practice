import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/users", {
        name,
        email,
      });

      console.log(res.data);

      setUsers([
        ...users,
        {
          // id: res.data.userId,
          name,
          email,
        },
      ]);

      setName("");
      setEmail("");

      setShowForm(false);

      alert("User created successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div>
        <h1>AWS USERS ARE WELCOME</h1>

        <button onClick={() => setShowForm(!showForm)}>
          Create User
        </button>

        {/* Form */}
        {showForm && (
          <form onSubmit={createUser}>
            <div>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit">
              Submit
            </button>
          </form>
        )}

        {/* Users List */}
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;