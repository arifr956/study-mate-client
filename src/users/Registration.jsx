import { useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers//AuthProvder/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';


const Registration = () => {
    const bgImage = 'https://i.ibb.co/q0vmBDR/video-conference-online-business-call-260nw-1793651794.jpg';
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    //github register
    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                toast.success(`Sucessfully Logged In with Github!`, {
                    position: "top-center",
                    autoClose: 3000,
                });
                navigate('/');
                console.log(result.user);
            })
            .catch()
    }

    //google register
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                toast.success(`Sucessfully Logged In with Google!`, {
                    position: "top-center",
                    autoClose: 3000,
                });
                navigate(location?.state ? location.state : '/');
                console.log(result.user);
            })
            .catch()
    }



    const handleRegister = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        console.log(form.get('name'));
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            toast.error(`Password must be at least 6 characters long.`, {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        // Check if password contains a capital letter
        if (!/[A-Z]/.test(password)) {
            toast.error(`Password must contain at least one capital letter.`, {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        // Check if password contains a special character
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            toast.error(`Password must contain at least one special character.`, {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }


        //create user 
        createUser(email, password)
            .then(result => {
                toast.success(`Hi ! ${name}, Welcome To A Tech !`, {
                    position: "top-center",
                    autoClose: 3000,
                });
                console.log(result.user);
                const user = { email };
                fetch('https://a-tech-server-lb6gxqnp0-arifur-rahmans-projects.vercel.app/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                navigate('/');
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                .then(() =>{
                    
                })
                .catch()
            })
            .catch(error => {
                // toast.error(`Oops! Error Occure:  ${error}!`, {
                //     position: "top-center",
                //     autoClose: 3000,
                // });
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200 bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="hero-content items-center">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-transparent"> {/* Set the card's background to transparent */}
                    <form onSubmit={handleRegister} className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}> {/* Set the form's background to a transparent color */}
                        <div className="flex flex-row items-center justify-center lg:justify-around gap-3">
                            <p className="mb-0 mr-4 text-lg">Register with</p>

                            {/* Google */}
                            <button onClick={handleGoogleLogin}
                                type="button"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className="mx-1 h-9 w-9 rounded-full bg-white uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                                <FcGoogle className="mx-auto h-3.5 w-3.5" />
                            </button>

                            {/* GitHub */}
                            <button onClick={handleGithubLogin}
                                type="button"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className="mx-1 h-9 w-9 rounded-full bg-black uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                                <FaGithub className="mx-auto h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Separator between social media sign in and email/password sign in */}
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                Or
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="Your Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register Now</button>
                        </div>
                        <div>
                            <h3 className='text-lg'>Already Have an Account? <Link to="/login"><span className='text-red-500'>LogIn Now</span></Link></h3>
                        </div>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;
