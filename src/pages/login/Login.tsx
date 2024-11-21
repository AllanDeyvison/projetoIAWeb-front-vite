import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../../models/UserLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import ModalforgotPassword from "@/components/forgotPasswordModal/ModalforgotPassword";
import MyModal from "@/components/editUser/EditUserModal";

function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>(
    {} as UserLogin);

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
    handleLogin(userLogin)
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
          text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
          dark:placeholder-gray-400 dark:text-white"
                  placeholder="MariaS"
                  name="username"
                  value={userLogin.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Senha</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 
          text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
          dark:placeholder-gray-400 dark:text-white"
                  name="password"
                  value={userLogin.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
              </div>
              <div className="flex items-start">
                {/* <ModalforgotPassword/> */}
                {/* <MyModal /> */}
                {/* <a data-dialog-target="modal" className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">Esqueceu a Senha?</a> */}
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
               text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

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
            </form>
          </div>

        </div>

      </div>



    </>
  );
}

export default Login;