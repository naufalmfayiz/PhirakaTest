import axios from "axios";
import sweetAlert from "../utils/sweetAlert";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + "/users",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setUsers(data);
    } catch (error) {
      sweetAlert(error.response.data.message);
    }
  };

  async function handleDelete(id) {
    try {
      let { data } = await axios({
        method: "delete",
        url: import.meta.env.VITE_API_BASE_URL + `/users/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchUsers();
      // console.log(data);
      Swal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log(error);
      sweetAlert(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  // console.log(users);

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Username</th>
            <th scope='col'>Password</th>
            <th scope='col'>Ctime</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope='row'>{user.id}</th>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
              <td>
                <div>
                  <Link
                    to={`/update/${user.id}`}
                    className='btn btn-warning btn-sm me-1'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                    className='btn btn-danger btn-sm'
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
