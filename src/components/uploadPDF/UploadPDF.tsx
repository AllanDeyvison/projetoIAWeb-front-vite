// import { useState } from "react";
// import axios from "axios";
// import { RotatingLines } from "react-loader-spinner";

// export const UploadPDF = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   // const handleUpload = async () => {
//   //   if (!file) {
//   //     setMessage("Selecione um arquivo primeiro.");
//   //     return;
//   //   }
    
//   //   const formData = new FormData();
//   //   formData.append("file", file);
    
//   //   try {
//   //     setLoading(true);
//   //     setMessage("");
//   //     const response = await axios.post("http://127.0.0.1:5000/embed", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });
//   //     setMessage("Upload realizado com sucesso!");
//   //   } catch (error) {
//   //     setMessage("Erro ao enviar o arquivo.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md max-w-sm mx-auto text-white">
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileChange}
//         className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         tabIndex={0}
//         aria-label="Selecionar arquivo PDF"
//       />
//       <button 
//         onClick={handleUpload} 
//         disabled={loading}
//         className="bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         title="Enviar arquivo PDF"
//         tabIndex={0}
//         aria-label="Enviar PDF"
//       >
//         {loading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : "Enviar PDF"}
//       </button>
//       {message && <p className="text-sm text-gray-700">{message}</p>}
//     </div>
//   );
// };

// export default UploadPDF;
