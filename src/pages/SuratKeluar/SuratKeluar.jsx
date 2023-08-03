import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import BasicTable from "../../components/BasicTable";
import Modal from "../../components/Modal";
import { useNavigate, Link } from 'react-router-dom';

const SuratKeluar = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const fileUrl = process.env.REACT_APP_FILE_URL;
    const sessionUid = localStorage.getItem('userid');
    /**
    * React Hook untuk state 
    */
    const [data, setData] = useState([]);
    const [jenisSuratData, setJenisSuratData] = useState([]);
    const [token, setToken] = useState('');
    const [records, setRecords] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        noSurat: "",
        judul: "",
        tanggalSurat: "",
        status: "1",
        jenisSurat: ""
    });

    /**
    * Kolom untuk data table
    */
    const columns = [
        {
            name: 'No Surat',
            selector: row => row.no_surat,
            sortable: true
        },
        {
            name: 'Judul',
            selector: row => row.judul,
        },
        {
            name: 'Tanggal Surat',
            selector: row => row.tanggal_surat,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Jenis',
            selector: row => row.nama_jenis,
            sortable: true
        },
        {
            name: 'File',
            selector: row => row.fileName,
            cell: (data) => {
                const dotIndex = data.fileName.lastIndexOf('.');
                const extension = data.fileName.substring(dotIndex + 1);
                return (
                    <Link
                        target="_blank"
                        to={fileUrl + "/" + data.file}
                    >
                        <p>
                            <i className="fa fa-file mx-1"></i>
                            {extension}
                        </p>
                    </Link>)
            },
        },
        {
            name: 'Actions',
            cell: (data) => (
                <>
                    <div className="col-md-10 my-2">
                        <Link className="btn btn-block bg-gradient-success"
                            variant="primary"
                            to={`/surat/keluar/${data.id}`}
                        >
                            Edit
                        </Link>
                        <button className="btn btn-block bg-gradient-danger"
                            role={"button"}
                            variant="danger"
                            disabled={sessionUid !== data.uid}
                            onClick={() => handleDelete(data.id)}>
                            Delete
                        </button>
                    </div>
                </>
            ),
        },
    ];



    /**
     * Function untuk fetch data dari API
     */
    useEffect(() => {
        const fetchData = async () => {
            // Get the token from localStorage or any other storage mechanism
            const privateToken = localStorage.getItem('token');
            console.log(privateToken);
            if (!privateToken) {
                // Token not found, handle the error accordingly
                console.log('Token not found');
                return;
            }
            setLoading(true);
            try {
                setToken(privateToken);
                const response = await axios.get(`${apiUrl}/suratkeluar`, {
                    headers: {
                        Authorization: `Bearer ${privateToken}` // Include the token in the request headers
                    }
                });
                const jenisSuratRes = await axios.get(`${apiUrl}/jenissurat`, {
                    headers: {
                        Authorization: `Bearer ${privateToken}` // Include the token in the request headers
                    }
                });
                setData(response.data.data);
                setJenisSuratData(jenisSuratRes.data.data);
                setRecords(response.data.data);
                setLoading(false);
            } catch (error) {
                // If the API returns an error, the token is either blacklisted or expired
                localStorage.clear();
                navigate('/login');
            }
        };
        fetchData();
    }, []);


    /**
     * Function untuk memproses input search dengan acuan no surat atau judul
     */
    const handleFilterChange = (event) => {
        const searchString = event.target.value.toLowerCase();

        // Mengembalikan data awal jika menghapus input
        if (searchString === "") {
            setRecords(data);
        } else {
            const newData = data.filter(
                (row) =>
                    row.no_surat.toLowerCase().includes(searchString) ||
                    row.judul.toLowerCase().includes(searchString)
            );
            setRecords(newData);
        }
    };

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const handleSaveChanges = async () => {

        if (!token) {
            // Token not found, handle the error accordingly
            console.log('Token not found');
            return;
        }

        if (!selectedFile || !formValues.judul || !formValues.noSurat
            || !formValues.tanggalSurat) {
            // jika ada input yang kosong, munculkan pesan error
            alert('Silakan lengkapi semua input terlebih dahulu!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('judul', formValues.judul);
        formData.append('no_surat', formValues.noSurat);
        formData.append('tanggal_surat', formValues.tanggalSurat);
        formData.append('jenis_surat', formValues.jenisSurat);
        formData.append('status', formValues.status);
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });
        try {
            const response = await axios.post(`${apiUrl}/suratkeluar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            });
            console.log(response.data.data);
            // redirect to the page you want to reload
            navigate(0);
        } catch (error) {
            if (error.response) {

                // Kesalahan server dengan kode status respons
                console.log(error.response.data.data);
                console.log(error.response.data.status);
                console.log(error.response.data.headers);
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

    const handleDelete = async (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete data with ID ${id}?`);
        if (!confirmed) {
            // If the user cancels the confirmation, do nothing
            return;
        }
        try {
            const response = await axios.delete(`${apiUrl}/suratkeluar/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            });
            // Show success message
            window.alert(`Deleted data with ID ${id}`);
            console.log(`Deleted data with ID ${id}:`, response.data.data);
            navigate(0);
        } catch (error) {
            // Show error message
            window.alert(`Error deleting data with ID ${id}: ${error.message}`);
            console.error(`Error deleting data with ID ${id}:`, error);
        }
    };

    const footerButtons = [
        {
            className: 'btn btn-primary',
            label: 'Save Changes',
            onClick: handleSaveChanges,
        },
    ];

    return (
        <>
            <h1>Surat Keluar</h1>
            <div className="row my-2">
                <div className="col">
                    <input
                        onChange={handleFilterChange}
                        placeholder={"Search"}
                        className="form-control"
                    />
                </div>
                <div className="col-7">
                </div>
                <div className="col">
                    <button role={"button"} variant="primary"
                        data-toggle="modal" data-target="#modal-lg"
                        className="btn btn-block btn-outline-primary" >
                        <i className="fa fa-plus mx-1"></i>
                        Add Surat Keluar
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <BasicTable columns={columns} data={records} />
            )}
            <Modal id="modal-lg" title="Surat Keluar" footerButtons={footerButtons}>
                <form>
                    <div className="form-group">
                        <label htmlFor="noSurat">No Surat</label>
                        <input type="text" className="form-control" name="noSurat" value={formValues.noSurat} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="judulSurat">Judul Surat</label>
                        <input type="text" className="form-control" name="judul" value={formValues.judul} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tanggalSurat">Tanggal Surat</label>
                        <input type="date" className="form-control" name="tanggalSurat" pattern="\d{2}-\d{2}-\d{4}" value={formValues.tanggalSurat} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusSurat">Status Surat</label>
                        <input type="text" className="form-control" name="status" value={formValues.status} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="jenisSuratData">Jenis Surat</label>
                        <select className="form-control" name="jenisSurat" id="jenisSurat" value={formValues.jenisSurat} onChange={handleInputChange}>
                            <option value="">Pilih jenis surat</option>
                            {jenisSuratData.map((jenisSurat) => (
                                <option key={jenisSurat.id} value={jenisSurat.id}>
                                    {jenisSurat.nama} {/* Assuming the API returns a property 'nama' for each jenisSurat */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">File</label>
                        <input type="file" className="form-control-file" id="file" onChange={handleFileInputChange} />
                    </div>
                </form>
            </Modal>
        </>
    );
}
export default SuratKeluar