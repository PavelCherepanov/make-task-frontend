import React, { useEffect, useState } from 'react'
import axios from "axios"

const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    // const [data, setData] = useState({ name: "", email: "", password: ""});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState("");

    const handleChange = (event) => {
      
      // setData({...data, [event.target.name]: event.target.value });
      // setEmail(e.target.value);
      // setName(e.target.value);
      // setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {email, name, password};
      axios
        .post("http://127.0.0.1:8000/api/users/", data)
        .then((response) => {
          setResponse(response.data);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
      <div className='container'>
        <h2 className='text-center'>Users</h2>
        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div> 
        <form class='col-md-5' onSubmit={handleSubmit}>
          <div class="card form-group">
            <div className='card-header'>
              <h2 className='text-center'>User Registration Form</h2>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" value={email}
            onChange={ (e) => setEmail(e.target.value)} placeholder="name@example.com"/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" value={name}
             onChange={ (e) => setName(e.target.value)} placeholder="Paul"/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleFormControlInput1" value={password}
            onChange={ (e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
        {response && (
        <p>
          Данные успешно отправлены: {response.name} ({response.email})
        </p>
      )}
      </div>
    )
  }
  
export default UsersComponent