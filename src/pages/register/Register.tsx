import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import { createUser } from "../../services/AuthService";
import { UserType } from "@/models/UserType";
import { ToastAlerts } from "@/utils/ToastAlerts";

function Register() {

  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    email: '',
    name: '',
    lastname: '',
    password: '',
    birthday: '',
    picture: '',
    userType: UserType.USER
  });

  const [userBackResp, setUserBackResp] = useState<User>({
    id: 0,
    username: '',
    email: '',
    name: '',
    lastname: '',
    password: '',
    birthday: '',
    picture: '',
    userType: UserType.USER
  });

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(preState => ({ ...preState, [name]: value }));
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function submitNewUser(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmPassword === user.password) {
      try {
        await createUser('/user/signup', user, setUserBackResp)
        ToastAlerts("Usuário cadastrado com sucesso!", "sucesso")
      } catch (error) {
        ToastAlerts("Erro ao cadastrar usuário!", "erro")
      }
    } else {
      ToastAlerts("Senhas não conferem!", "erro")
      setUser({ ...user, password: '' })
      setConfirmPassword('')
    }
  }

  function back() {
    navigate("/login")
  }

  useEffect(() => {
    if (userBackResp.id !== 0) {
      back()
    }
  }, [userBackResp])


  return (
    <>
      <div className="grid grid-cols-1 place-items-center ">
        <div className="max-w-2xl p-5 mx-auto ">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 ">
            <form className="space-y-6 p-10" onSubmit={submitNewUser}>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white" >Cadastrar</h3>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Nome</label>
                  <input type="text" id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Maria"
                    name="name"
                    value={user.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Sobrenome</label>
                  <input type="text" id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Silva"
                    name="lastname"
                    value={user.lastname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                    } />
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Nome de Usuário</label>
                  <input type="text" id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
  p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="MariaS"
                    name="username"
                    value={user.username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                    } />
                </div>
                <div>
                  <div className="mb-5">
                    <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">
                      Data de nascimento
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
        w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={user.birthday}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Foto URL</label>
                <input type="url" id="picture" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
  focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500
   dark:focus:border-blue-500" placeholder="suafoto.com"
                  value={user.picture}
                  name="picture"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                  } />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500" placeholder="maria.silva@example.com"
                  value={user.email}
                  name="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                  } />
              </div>
              <div className="mb-6">
                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Senha</label>
                <input type="password" id="senha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500" placeholder="•••••••••"
                  value={user.password}
                  name="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                  } />
              </div>
              <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Confirmar senha</label>
                <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark 
dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)
                  }
                />
              </div>





              <div className="flex items-start mb-6">
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Já tem conta? <a href="#" onClick={back} className="text-blue-600 hover:underline dark:text-blue-500">Entre</a>.</label>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cadastrar</button>
            </form>
          </div>
        </div>



      </div>

    </>
  );
}

export default Register;