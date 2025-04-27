import { useState } from "react";
import axios from "axios";

export const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecione um arquivo primeiro.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post("http://127.0.0.1:5000/embed", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Upload realizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md max-w-sm mx-auto text-white">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button 
        onClick={handleUpload} 
        disabled={loading}
        className="bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Enviando..." : "Enviar PDF"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadPDF;
