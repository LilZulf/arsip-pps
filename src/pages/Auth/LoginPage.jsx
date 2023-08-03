import React, { useMemo, useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const handleLogin = async () => {
        if (!formValues.email || !formValues.password) {
            // jika ada input yang kosong, munculkan pesan error
            alert('Silahkan lengkapi semua input terlebih dahulu!');
            return;
        }

        const formData = new FormData();
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);

        try {
            const response = await axios.post(`${apiUrl}/login`, formData);
            console.log(response.data);
            const token = response.data.token;
            // Store the token in localStorage or any other appropriate storage
            localStorage.setItem('token', token);
            localStorage.setItem('username', response.data.user.name);
            localStorage.setItem('userid', response.data.user.id);
            // Include the token in subsequent requests
            axios.defaults.headers.common['Authorization'] = token;

            navigate('/');
        } catch (error) {
            if (error.response) {
                // Kesalahan server dengan kode status respons
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                window.alert('Terjadi kesalahan server dengan kode status respons ' + error.response.status);
            } else if (error.request) {
                // Kesalahan saat mencoba melakukan request
                console.log(error.request);
                window.alert('Terjadi kesalahan saat mencoba melakukan request');
            } else {
                // Kesalahan lainnya
                console.log('Error', error.message);
                window.alert('Terjadi kesalahan lainnya');
            }
        }
    }

    return (
        <div className='login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Admin</b>PPS</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" name='email' placeholder="Email"
                                    value={formValues.email} onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name='password' placeholder="Password"
                                    value={formValues.password} onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="button" onClick={handleLogin} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <p className="mb-1">
                            <a href="forgot-password.html" >I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <Link to={'/register'} className="text-center">Register as panitia</Link>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    )
}

export default LoginPage