import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import sweetAlert from "../utils/sweetAlert";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  // console.log(input);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const submitSignUp = async (event) => {
    event.preventDefault();

    try {
      let { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + "/register",
        data: input,
      });
      // console.log(data);
      Swal.fire({
        title: "Success!",
        text: "User registered successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      sweetAlert(error.response.data.message);
    }
  };

  return (
    <section className='container'>
      <div className='col-12 col-lg-8 offset-lg-2 my-5 bg-black bg-opacity-25'>
        <div className='row'>
          <div className='col-12 col-md-6 p-4 text-left'>
            <img
              src='https://static.vecteezy.com/system/resources/previews/030/464/238/non_2x/cybersecurity-ensures-user-privacy-with-encryption-emphasizing-data-protection-and-digital-safety-vertical-mobile-wallpaper-ai-generated-free-photo.jpg'
              width='350px'
              height='400px'
              alt='login pic'
            />
          </div>
          <div className='col-12 col-md-6 pt-5 px-5 text-center'>
            <div className='form-signin m-auto'>
              <form id='login-form' onSubmit={submitSignUp}>
                <h4 className='mb-3'>Register to TheUsers</h4>
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
                <button
                  className='btn btn-lg btn-primary btn-sm rounded-pill w-50 p-2'
                  type='submit'
                >
                  Register
                </button>
              </form>
            </div>
            <p className='mt-3'>
              Already have an account? <Link to='/login'>login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
