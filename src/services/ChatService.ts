
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000`
  }); 



  export async function  sendNewMessage(endpoint: string, text: string, userId: string): Promise<string> {
    try {
      const response = await axios.post(endpoint, {message: text}, {params: {user_id: userId}});
      console.log(response.data)
      return response.data.answer.resposta;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Erro no servidor');
      } else {
        throw new Error('Erro na conexão');
      }
    }
  }

  export async function listChats(endpoint: string, userId: string) {
    try {
      const response = await axios.get(endpoint, {
        params: { user_id: userId }
      });
      return response.data; // <- Aqui retorna o que seu back mandar (provavelmente um array)
    } catch (error: any) {
      console.error('Erro ao listar chats:', error);
      throw new Error('Erro ao listar chats');
    }
  }

  export async function sendOldMessage(endpoint: string, text: string): Promise<string> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),

    });
    const data = await response.json();
    return data.answer;
  }

  
  export const getBotResponse = async(url: string, dados: Object) => {
    const resp = (await api.post(url, dados)).headers
    return resp.data
  }


  export async function getMessages(endpoint: string): Promise<any> {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  }

