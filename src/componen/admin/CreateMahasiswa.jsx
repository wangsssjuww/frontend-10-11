import React, { useState } from "react";
import apis from "../../api/mahasiswa";

const CreateMahasiswa = ({ onClose }) => {
    const [nim, setNim] = useState('');
    const [nama, setNama] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [prodi, setProdi] = useState('Teknik Informatika');

    const clearForm = () => {
        setNim('');
        setNama('');
        setAngkatan('');
        setProdi('Teknik Informatika');
    };

    const addMahasiswa = async () => {
        if (!nim.trim() || !nama.trim() || !angkatan.trim() || !prodi.trim()) {
            alert('Isian tidak boleh kosong');
        } else {
            const mhsBaru = { nim: nim.trim(), nama: nama.trim(), angkatan: angkatan.trim(), prodi };
            try {
                await apis.createMahasiswa(mhsBaru);
                alert('Data berhasil ditambah');
                clearForm();
            } catch (error) {
                console.error('Error adding student:', error);
                if (error.response) {
                    console.error('Server response:', error.response.data);
                    alert(`Terjadi kesalahan: ${error.response.data.message}`);
                } else {
                    alert('Terjadi kesalahan saat menambah data');
                }
            }
        }
    };

    const styles = {
        container: {
            width: '50%',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#4a5568',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #cbd5e0',
            outline: 'none',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #cbd5e0',
            outline: 'none',
            boxSizing: 'border-box',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
        },
        addButton: {
            backgroundColor: '#007bff',
            color: 'white',
            marginLeft: '10px',
        },
        backButton: {
            backgroundColor: '#6c757d',
            color: 'white',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Input Mahasiswa</h1>
            <div style={styles.formGroup}>
                <label htmlFor="nim" style={styles.label}>NIM:</label>
                <input
                    type="text"
                    id="nim"
                    style={styles.input}
                    placeholder="ex: 1121186106"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="nama" style={styles.label}>Nama:</label>
                <input
                    type="text"
                    id="nama"
                    style={styles.input}
                    placeholder="ex: Windi"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="angkatan" style={styles.label}>Angkatan:</label>
                <input
                    type="text"
                    id="angkatan"
                    style={styles.input}
                    placeholder="ex: 2021"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="prodi" style={styles.label}>Prodi Studi:</label>
                <select
                    id="prodi"
                    style={styles.select}
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                >
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Manajemen Informatika">Manajemen Informatika</option>
                </select>
            </div>
            <div style={styles.buttonGroup}>
                <button
                    style={{ ...styles.button, ...styles.backButton }}
                    onClick={onClose}
                >
                    Kembali
                </button>
                <button
                    style={{ ...styles.button, ...styles.addButton }}
                    onClick={addMahasiswa}
                >
                    Tambah
                </button>
            </div>
        </div>
    );
};

export default CreateMahasiswa;

// import {useState} from "react";
// import apis from '../../api/mahasiswa'

// const CreateMahasiswa = () => {
//     const [nim, setNim] = useState('')
//     const [nama, setNama] = useState('')
//     const [angkatan, setAngkatan] = useState('')
//     const [prodi, setProdi] = useState('informatika')

//     const clearForm = () => {
//         setNim('')
//         setNama('')
//         setAngkatan('')
//         //setProdi('')
//     };

//     const addMahasiswa = async () => {
//         if (!nim || !nama || !angkatan || !prodi) {

//             alert('isian tidak boleh kosong')

//         }
//         else {
//             const mhsBaru = {nim, nama, angkatan, prodi};
//             try {
//                 await apis.createMahasiswa(mhsBaru);

//                 alert('Data berhasil ditambah')
//                 clearForm()
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="w-1/2 mx-auto rounded-lg shadow-lg p-8">
//                 <h1 className="text-2xl font-bold">Input Mahasiswa</h1>
//                 <div>
//                     <div className="mt-4">
//                         <label htmlFor="nim" className="block text-gray-700 font-bold mb-2">
//                             NIM :
//                         </label>
//                         <input
//                             type="text" id="nim" className="shadow appearance-none border rounded w-full py-2 px-3
//                             text-gray-700 leading-tight focus:outline-none focus:shadow outline"
//                             placeholder="ex: 1111"
//                             value={nim}
//                             onChange={(e) => {setNim(e.target.value)}}
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label htmlFor="nama" className="block text-gray-700 font-bold mb-2">
//                             Nama :
//                         </label>
//                         <input
//                             type="text" id="nama" className="shadow appearance-none border rounded w-full py-2 px-3
//                             text-gray-700 leading-tight focus:outline-none focus:shadow outline"
//                             placeholder="ex: pratiwi"
//                             value={nama}
//                             onChange={(e) => {setNama(e.target.value)}}
//                         />
//                     </div>
//                     <div className="mt-4">
//                     <label htmlFor="angkatan" className="block text-gray-700 font-bold mb-2">
//                             Angkatan :
//                         </label>
//                         <input
//                             type="text" id="angkatan" className="shadow appearance-none border rounded w-full py-2 px-3
//                             text-gray-700 leading-tight focus:outline-none focus:shadow outline"
//                             placeholder="ex: 2020"
//                             value={angkatan}
//                             onChange={(e) => {setAngkatan(e.target.value)}}
//                         />
//                     </div>
//                     <div className="mt-4">
//                     <label htmlFor="program-studi" className="block text-gray-700 font-bold mb-2">
//                             Program Studi :
//                         </label>
//                         <select
//                             id="program-studi"
//                             className="shadow appearance-none border rounded w-full py-2 px-3
//                             text-gray-700 leading-tight focus:outline-none focus:shadow outline"
//                             value={prodi}
//                             onChange={(e) => {setProdi(e.target.value)}}
//                         >
//                             <option value="informatika">informatika</option>
//                             <option value="hukum">hukum</option>
//                             <option value="managemen">managemen</option>
//                         </select>
//                     </div>
//                     <div className="flex flex-row justify-end mt-4">
//                         <button
//                             className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
//                             onClick={addMahasiswa}
//                         >
//                             Tambah
//                         </button>
//                     </div>

//                 </div>    
//             </div>
//         </>
//     );
// }

// export default CreateMahasiswa;