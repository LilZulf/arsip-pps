import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nama: "",
        email: "",
        confirmPassword: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async () => {
        if (!formValues.email || !formValues.password) {
            // jika ada input yang kosong, munculkan pesan error
            alert('Silahkan lengkapi semua input terlebih dahulu!');
            return;
        }

        if (formValues.confirmPassword != formValues.password) {
            // jika ada input yang kosong, munculkan pesan error
            alert('Silahkan periksa password anda');
            return;
        }

        const formData = new FormData();
        formData.append('nama', formValues.nama);
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);

        try {
            const response = await axios.post(`${apiUrl}/user/register`, formData);
            //console.log(response.data);
            navigate('/login');
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
        <div className='register-page'>
            <div className="register-box">
                <div className="register-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new membership</p>
                        <form>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name='nama' placeholder="Full name"
                                    value={formValues.nama} onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" name='email' placeholder="Email"
                                    value={formValues.email} onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name='password' placeholder="Password"
                                    value={formValues.password} onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name='confirmPassword' placeholder="Retype password"
                                    value={formValues.confirmPassword} onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                                        <label htmlFor="agreeTerms">
                                            I agree to the <a href="#">terms</a>
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="button" onClick={handleRegister} className="btn btn-primary btn-block">Register</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <a href="login.html" className="text-center">I already became panitia</a>
                    </div>
                    {/* /.form-box */}
                </div>{/* /.card */}
            </div>
        </div>
    )
}

export default RegisterPage