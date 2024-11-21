import Message from "@/models/Message";
import axios from "axios";

const api = axios.create({
    baseURL: `http://127.0.0.1:5000`
  });
  


  export const getBotResponse = async(url: string, dados: Object) => {
    const resp = (await api.post(url, dados)).headers
    return resp.data
  }

  export async function sendMessage(endpoint: string, text: string): Promise<string> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });
    const data = await response.json();
    return data.answer;
  }

