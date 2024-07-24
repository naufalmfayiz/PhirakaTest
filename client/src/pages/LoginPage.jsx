import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sweetAlert from "../utils/sweetAlert";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const recaptcha = useRef(null);

  const submitLogin = async (event) => {
    event.preventDefault();

    const recaptchaValue = recaptcha.current.getValue();
    if (!recaptcha.current.getValue()) {
      sweetAlert("Please Submit Captcha");
    }
    // console.log(recaptchaValue);

    try {
      let { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + "/login",
        data: { ...input, reCaptchaToken: recaptchaValue },
      });
      // console.log(data);
      localStorage.access_token = data.access_token;
      localStorage.username = data.username;

      Swal.fire({
        title: "Success!",
        text: "Welcome to TheUsers!",
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
    <section className='container'>
      <div className='col-12 col-lg-8 offset-lg-2 my-5 bg-black bg-opacity-25'>
        <div className='row'>
          <div className='col-12 col-md-6 p-4 text-left'>
            <img
              src='https://static.vecteezy.com/system/resources/previews/030/464/172/large_2x/safeguarding-user-privacy-cybersecurity-shields-through-encryption-highlighting-data-protection-vertical-mobile-wallpaper-ai-generated-free-photo.jpg'
              width='350px'
              height='400px'
              alt='login pic'
            />
          </div>
          <div className='col-12 col-md-6 pt-4 px-5 text-center'>
            <div className='form-signin mx-auto my-5'>
              <form id='login-form' onSubmit={submitLogin}>
                <h4 className='mb-3'>Login to TheUsers</h4>
                <div className='mb-3 mt-3'>
                  <div className='d-flex justify-content-between'>
                    <label htmlFor='login-email'>Username</label>
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
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  ref={recaptcha}
                />
                <button
                  className='btn btn-lg btn-primary btn-sm rounded-pill w-50 p-2 mt-1'
                  type='submit'
                >
                  Log In
                </button>
              </form>
            </div>
            <p className='mt-1'>
              Dont have account yet? <Link to='/register'>register</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
