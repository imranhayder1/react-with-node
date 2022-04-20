
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleForm = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    // server site data

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
        //  console.log(data)

      })
  }
  return (
    <div className="App">
      <h1>Our user: {users.length}</h1>
      <form onSubmit={handleForm}>
        <input type="text" name="name" placeholder='Name' required />
        <br />
        <input type="email" name="email" placeholder='Email' required />
        <br />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Name: {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
