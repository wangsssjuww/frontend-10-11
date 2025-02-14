import React, { useEffect, useState } from 'react';
import apis from '../../api/mahasiswa';

const UpdateMahasiswa = ({ isOpen, onClose, mhs }) => {
  const [_mhs, setMhs] = useState({ nim: '', nama: '', angkatan: '', prodi: '' });

  // useEffect untuk mengatur nilai _mhs saat mhs berubah
  useEffect(() => {
    setMhs(mhs); // Menetapkan nilai mhs ke _mhs saat prop mhs berubah
  }, [mhs]);

  // Handler untuk mengubah nilai _mhs saat input berubah
  const handleInputChange = (event) => {
    setMhs({
      ..._mhs,
      [event.target.name]: event.target.value
    });
  };

  // Handler untuk mengirimkan data mahasiswa yang diperbarui
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apis.updateMahasiswa(_mhs.nim, _mhs); // Memanggil fungsi updateMahasiswa dengan nilai _mhs
      onClose(); // Menutup form setelah berhasil
    } catch (error) {
      console.error(error); // Menangkap dan mencetak error jika ada
    }
  };

  // Mengembalikan null jika form tidak terbuka (isOpen bernilai false)
  if (!isOpen) {
    return null;
  }

  // Render form untuk memperbarui data mahasiswa
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>NIM:</label>
        <input
          type="text"
          name="nim"
          value={_mhs.nim}
          onChange={handleInputChange}
        />
        <label>Nama:</label>
        <input
          type="text"
          name="nama"
          value={_mhs.nama}
          onChange={handleInputChange}
        />
        <label>Angkatan:</label>
        <input
          type="text"
          name="angkatan"
          value={_mhs.angkatan}
          onChange={handleInputChange}
        />
        <label>Prodi:</label>
        <input
          type="text"
          name="prodi"
          value={_mhs.prodi}
          onChange={handleInputChange}
        />
        <button type="submit">Update Mahasiswa</button>
      </form>
    </div>
  );
};

export default UpdateMahasiswa;

// import React, { useEffect, useState } from "react";
// import apis from "../../api/mahasiswa";

// const UpdateMahasiswa = ({ isOpen, onClose, mhs }) => {
//     const [_mhs, set_Mhs] = useState({nim:'', nama:'', angkatan:'', prodi:''})


//     useEffect(() => {
//         set_Mhs({ ..._mhs, ...mhs})
//     }, [mhs]);

//     const handleInputChange = (event) => {
//         set_Mhs({
//             ..._mhs,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await apis.UpdateMahasiswa(_mhs.nim, _mhs);
//             onClose();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     if (!isOpen) {
//         return null;
//     }
//     return ( 
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             <div className="bg-white w-1/3 rounded-lg z-10">
//                 <div className="p-4">
//                     <h2 className="text-xl font-bold mb-4">Update Mahasiswa</h2>
//                     <form on onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-bold mb-1">
//                                 NIM : 
//                             </label>
//                             <input 
//                                 type="text"
//                                 name="nim"
//                                 className="w-full border-gray-300 p-2 rounded-md"
//                                 value={_mhs.nim}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-bold mb-1">
//                                 Nama : 
//                             </label>
//                             <input 
//                                 type="text"
//                                 name="nama"
//                                 className="w-full border-gray-300 p-2 rounded-md"
//                                 value={_mhs.nama}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-bold mb-1">
//                                 Angkatan : 
//                             </label>
//                             <input 
//                                 type="text"
//                                 name="angkatan"
//                                 className="w-full border-gray-300 p-2 rounded-md"
//                                 value={_mhs.angkatan}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-bold mb-1">
//                                 Prodi : 
//                             </label>
//                             <input 
//                                 type="text"
//                                 name="prodi"
//                                 className="w-full border-gray-300 p-2 rounded-md"
//                                 value={_mhs.prodi}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="text-right">
//                             <button
//                                 type="button"
//                                 className="mr-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-white"
//                                 onClick={onClose}>
//                                     Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
//                                     Update
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//      );
// }
 
// export default UpdateMahasiswa;