import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../../models/UserLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { FiHelpCircle } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>(
    {} as UserLogin);

  const [keepConnected, setKeepConnected] = useState(false);

  const { user, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user.token !== "") {
      navigate('/home');
    }
  }, [user]);

  function updateState(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value })
  }

  function login(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    handleLogin(userLogin, keepConnected)
  }

  return (
    <>
      <div className="grid grid-cols-1  place-items-center ">
        <div className="max-w-2xl p-5 mx-auto h-dvh">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6 p-10" action="#" onSubmit={login}>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login</h3>
              <div>
                <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Usuário</label>
                <input type="text" id="username"
                  className="bg-gray-50 border border-gray-300 
          text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
          dark:placeholder-gray-400 dark:text-white transition"
                  placeholder="MariaS"
                  name="username"
                  value={userLogin.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Senha</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 
          text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
          dark:placeholder-gray-400 dark:text-white transition"
                  name="password"
                  value={userLogin.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
              </div>
              <div className="flex items-center mb-1">
                <input
                  id="keepConnected"
                  type="checkbox"
                  checked={keepConnected}
                  onChange={e => setKeepConnected(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="keepConnected" className="text-sm text-gray-700 dark:text-gray-300">
                  Me manter conectado?
                </label>
              </div>
              <button type="submit" className="w-full text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg
               text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 mt-2 transition"
                tabIndex={0}
                aria-label="Entrar"
              >
                {isLoading ? <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                /> :
                  <span>Entrar</span>}
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Ainda não tem uma conta? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                  <Link to="/register" className="text-indigo-800 hover:underline">
                    Cadastre-se
                  </Link>
                </a>
              </div>
              <div className="mt-2 text-sm text-center flex justify-center items-center gap-1">
                <FiHelpCircle className="inline" />
                <Link to="/help" className="text-blue-700 hover:underline dark:text-blue-400">
                  Precisa de ajuda?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;