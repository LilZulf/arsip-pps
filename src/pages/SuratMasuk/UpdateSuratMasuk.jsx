import React from 'react'
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export const UpdateSuratMasuk = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [singleData, setSingleData] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSingleData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchDataById = async () => {
            try {
                const response = await axios.get(`${apiUrl}/suratmasuk/${id}`);
                setSingleData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataById();
    }, []);

    const handleSaveChanges = async (e) => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Token not found, handle the error accordingly
            console.log('Token not found');
            return;
        }

        if (!selectedFile || !singleData.judul || !singleData.no_surat
            || !singleData.tanggal_surat || !singleData.jenis_surat) {
            // jika ada input yang kosong, munculkan pesan error
            alert('Silakan lengkapi semua input terlebih dahulu!');
            console.log(singleData);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('judul', singleData.judul);
        formData.append('no_surat', singleData.no_surat);
        formData.append('tanggal_surat', singleData.tanggal_surat);

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const currentDate = day + '-' + month + '-' + year;

        formData.append('tanggal_upload', currentDate);
        formData.append('status', singleData.status);
        formData.append('jenis_surat', singleData.jenis_surat);

        try {
            e.preventDefault();
            const response = await axios.patch(`${apiUrl}/suratmasuk/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            // redirect to the page you want to reload
            navigate("/surat/masuk");
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
        <>
            <h1>Update Surat Masuk</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="no_surat">No Surat</label>
                    <input type="text" className="form-control" name="no_surat" value={singleData.no_surat || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="judul">Judul Surat</label>
                    <input type="text" className="form-control" name="judul" value={singleData.judul || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tanggal_surat">Tanggal Surat</label>
                    <input type="text" className="form-control" name="tanggal_surat" value={singleData.tanggal_surat || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status Surat</label>
                    <input type="text" className="form-control" name="status" value={singleData.status || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="jenis_surat">Jenis Surat</label>
                    <select className="form-control" name="jenis_surat" id="jenis_surat" value={singleData.jenis_surat || ""} onChange={handleInputChange}>
                        <option value="">Pilih jenis surat</option>
                        <option value="1">Berita Acara</option>
                        <option value="2">SK</option>
                        <option value="3">Surat Pengumuman</option>
                        <option value="4">Surat Undangan</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="file">File</label>
                    <input type="file" className="form-control-file" id="file" onChange={handleFileInputChange} />
                </div>
            </form>
            <button role={"button"} variant="primary"
                onClick={handleSaveChanges}
                className="btn btn-primary" >
                Update Surat Masuk
            </button>
        </>
    )
}
