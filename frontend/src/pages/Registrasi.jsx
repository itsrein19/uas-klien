import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Registrasi = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true); 
            setErrorMessage('');
            setResponseMessage('');
    
            try {
                const response = await axios.post("http://demo-api.syaifur.io/api/register", form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                console.log(response.data)
    
                if (response.data.code === 201) {
                    setResponseMessage(response.data.message);
                    setForm({
                        name: '',
                        email: '',
                        password: ''
                    });
                    Swal.fire({
                        icon: "success",
                        title: "Registrasi Berhasil",
                        text: response.data.message,
                    });
                    
                                    // Arahkan ke halaman dashboard atau halaman lainnya setelah login berhasil
                                    navigate("/");
                }
            } catch (error) {
                if (error.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Login Gagal",
                        text: error.response?.data?.message || "Silahkan coba lagi",
                    });
                } else {
                    setErrorMessage('No connection. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

    return(
        <div className="m-0 p-0 h-screen bg-white-400 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Masuk Ke Halaman Registrasi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">Nama</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                            placeholder="Nama"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={() => navigate("/")}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering...": "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Registrasi;