import React, { useEffect, useState } from "react";
import apis from "../../api/mahasiswa";
import CreateMahasiswa from "./CreateMahasiswa";

const GetMahasiswa = () => {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [error, setError] = useState(null);
    const [nim, setNim] = useState('');
    const [searchNim, setSearchNim] = useState('');
    const [updateMahasiswa, setUpdateMahasiswa] = useState(null);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (searchNim) {
                    response = await apis.getMahasiswaByNim(searchNim);
                    setMahasiswa(response.data ? [response.data] : []);
                } else {
                    response = await apis.getMahasiswa();
                    setMahasiswa(response.data);
                }
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with an error", error.response.data);
                    setError(error.response.data.message || "Server Error");
                } else if (error.request) {
                    console.error("No response from server", error.request);
                    setError("No response from server");
                } else {
                    console.error("Error setting up request", error.message);
                    setError(error.message);
                }
            }
        };
        fetchData();
    }, [searchNim]);

    const handleSearch = () => {
        setSearchNim(nim);
    };

    const UpdateMahasiswa = (mhs) => {
        setUpdateMahasiswa(mhs);
        setIsOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setIsOpenUpdate(false);
    };

    const deleteMahasiswa = async (nim) => {
        try {
            await apis.deleteMahasiswa(nim);
            setMahasiswa(mahasiswa.filter((mhs) => mhs.nim !== nim));
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error", error.response.data);
                setError(error.response.data.message || "Server Error");
            } else if (error.request) {
                console.error("No response from server", error.request);
                setError("No response from server");
            } else {
                console.error("Error setting up request", error.message);
                setError(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Daftar Mahasiswa</h1>
                    <div className="w-full md:w-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input type="search" value={nim} onChange={(e) => setNim(e.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cari NIM" />
                            <button onClick={handleSearch} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">NIM</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">NAMA</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ANGKATAN</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">PRODI</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mahasiswa.map((mhs) => (
                                <tr key={mhs.nim} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{mhs.nim}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{mhs.nama}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{mhs.angkatan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{mhs.prodi}</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                                        <button onClick={() => UpdateMahasiswa(mhs)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Update</button>
                                        <button onClick={() => deleteMahasiswa(mhs.nim)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenUpdate && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                        <CreateMahasiswa mhs={updateMahasiswa} onClose={handleCloseUpdate} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetMahasiswa;
