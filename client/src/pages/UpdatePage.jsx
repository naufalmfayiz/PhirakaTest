import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import sweetAlert from "../utils/sweetAlert";

export default function UpdatePage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  // console.log(input);
  const id = useParams().id;

  const fetchUserById = async (id) => {
    try {
      let { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/users/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setInput(data);
    } catch (error) {
      console.log(error);
      sweetAlert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let { data } = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_BASE_URL + "/users/" + id,
        data: input,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      Swal.fire({
        title: "Success!",
        text: `User ${id} updated successfully`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      sweetAlert(error.response.data.message);
    }
  };

  return (
    <section className='mx-auto col-8 col-md-12 col-lg-9 px-md-4 mt-5'>
      <div className='row mt-3'>
        <div className='mx-auto col-12 col-md-6 bg-light bg-opacity-25'>
          <form onSubmit={handleUpdate}>
            <h3 className='my-3 text-center'>Update User</h3>
            <div className='mb-3 mt-5'>
              <div className='d-flex justify-content-between'>
                <label htmlFor='login-username'>Username</label>
              </div>
              <input
                type='text'
                name='username'
                className='form-control'
                id='login-username'
                placeholder='Enter your username...'
                autoComplete='off'
                required=''
                value={input.username}
                onChange={handleChangeInput}
              />
            </div>
            <div className='mb-3'>
              <div className='d-flex justify-content-between'>
                <label htmlFor='login-password'>Password</label>
              </div>
              <input
                type='password'
                name='password'
                className='form-control'
                id='login-password'
                placeholder='Enter your password...'
                autoComplete='off'
                required=''
                onChange={handleChangeInput}
              />
            </div>
            <div className='row mt-5 mb-3'>
              <div className='col-6'>
                <button
                  className='btn btn-lg btn-primary rounded-pill w-100 p-2'
                  type='submit'
                >
                  Submit
                </button>
              </div>
              <div className='col-6'>
                <Link
                  className='btn btn-lg btn-danger rounded-pill w-100 p-2'
                  to='/'
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
