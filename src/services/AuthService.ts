import Message from "@/models/Message";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8090`
});

export const createUser = async(url: string, dados: Object, setDados: Function) => {
    const resp = await api.post(url, dados)
    setDados(resp.data)
}

export const login = async(url: string, dados: Object, setDados: Function) => {
    const resp = await api.post(url, dados)
    setDados(resp.data)
}

export const update = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resp = await api.put(url, dados, header)
  setDados(resp.data)
}

export const search = async(url: string, setDados: Function, header: Object) => {
  const resp = await api.get(url, header)
  setDados(resp.data)
}

export const saveMessage = async(endpoint: string, message: Message, header: Object) => {
  await api.post(endpoint, message, header) 
}


// export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
//   const resposta = await api.post(url, dados, header)
//   setDados(resposta.data)
// }

export const deleteUser = async(url: string, header: Object) => {
  await api.delete(url, header)
}
