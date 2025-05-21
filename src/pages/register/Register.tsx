import { ChangeEvent, useEffect, useRef, useState } from "react";
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

  // Refs para focar nos campos
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Estados de erro
  const [errors, setErrors] = useState({
    name: false,
    lastname: false,
    username: false,
    birthday: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [formDirty, setFormDirty] = useState(false);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(preState => ({ ...preState, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
    setFormDirty(true);
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    setErrors(prev => ({ ...prev, confirmPassword: false }));
    setFormDirty(true);
  }

  async function submitNewUser(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    // Checagem de campos obrigatórios
    const newErrors = {
      name: user.name.trim() === "",
      lastname: user.lastname.trim() === "",
      username: user.username.trim() === "",
      birthday: user.birthday.trim() === "",
      email: user.email.trim() === "",
      password: user.password.trim() === "",
      confirmPassword: confirmPassword.trim() === "",
    };
    setErrors(newErrors);

    // Se algum campo obrigatório estiver vazio, avise o usuário
    if (
      newErrors.name ||
      newErrors.lastname ||
      newErrors.username ||
      newErrors.birthday ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      ToastAlerts("Preencha todos os campos obrigatórios!", "erro");
    }

    // Focar no primeiro campo inválido
    if (newErrors.name) { nameRef.current?.focus(); return; }
    if (newErrors.lastname) { lastnameRef.current?.focus(); return; }
    if (newErrors.username) { usernameRef.current?.focus(); return; }
    if (newErrors.birthday) { birthdayRef.current?.focus(); return; }
    if (newErrors.email) { emailRef.current?.focus(); return; }
    if (newErrors.password) { passwordRef.current?.focus(); return; }
    if (newErrors.confirmPassword) { confirmPasswordRef.current?.focus(); return; }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setErrors(prev => ({ ...prev, email: true }));
      emailRef.current?.focus();
      ToastAlerts("Digite um e-mail válido!", "erro");
      return;
    }
    // Validação de senha
    if (user.password.length < 8 || !/\d/.test(user.password) || !/[a-zA-Z]/.test(user.password)) {
      setErrors(prev => ({ ...prev, password: true }));
      passwordRef.current?.focus();
      ToastAlerts("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.", "erro");
      return;
    }
    if (confirmPassword !== user.password) {
      setErrors(prev => ({ ...prev, confirmPassword: true }));
      confirmPasswordRef.current?.focus();
      ToastAlerts("Senhas não conferem!", "erro");
      setUser({ ...user, password: '' });
      setConfirmPassword('');
      return;
    }
    try {
      await createUser('/user/signup', user, setUserBackResp)
      ToastAlerts("Usuário cadastrado com sucesso!", "sucesso")
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Erro ao cadastrar usuário!";
      ToastAlerts(errorMsg, "erro")
    }
  }

  function back() {
    navigate("/login")
  }

  function backWithAlert(e?: React.MouseEvent) {
    if (formDirty) {
      const confirmLeave = window.confirm("Você tem alterações não salvas. Tem certeza que deseja sair?");
      if (!confirmLeave) {
        if (e) e.preventDefault();
        return;
      }
    }
    navigate("/login");
  }

  useEffect(() => {
    if (userBackResp.id !== 0) {
      back()
    }
  }, [userBackResp])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (formDirty) {
        event.preventDefault();
        event.returnValue = ''; // Mensagem customizada é ignorada, mas isso ativa o alerta padrão do navegador
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formDirty]);

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
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 transition`}
                    placeholder="Maria"
                    name="name"
                    value={user.name}
                    onChange={updateState}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Sobrenome</label>
                  <input
                    ref={lastnameRef}
                    type="text"
                    id="lastname"
                    className={`bg-gray-50 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 transition`}
                    placeholder="Silva"
                    name="lastname"
                    value={user.lastname}
                    onChange={updateState}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Nome de Usuário</label>
                  <input
                    ref={usernameRef}
                    type="text"
                    id="username"
                    className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full 
  p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 transition`}
                    placeholder="MariaS"
                    name="username"
                    value={user.username}
                    onChange={updateState}
                  />
                </div>
                <div>
                  <div className="mb-5">
                    <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">
                      Data de nascimento
                    </label>
                    <input
                      ref={birthdayRef}
                      type="date"
                      name="birthday"
                      id="birthday"
                      className={`bg-gray-50 border ${errors.birthday ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block
        w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition`}
                      value={user.birthday}
                      onChange={updateState}
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
                  onChange={updateState}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Email</label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500`}
                  placeholder="maria.silva@example.com"
                  value={user.email}
                  name="email"
                  onChange={updateState}
                />
                <small className="text-gray-500 dark:text-gray-400">Digite um e-mail válido (ex: usuario@dominio.com)</small>
              </div>
              <div className="mb-6">
                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Senha</label>
                <input
                  ref={passwordRef}
                  type="password"
                  id="senha"
                  className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500`}
                  placeholder="•••••••••"
                  value={user.password}
                  name="password"
                  onChange={updateState}
                />
                <small className="text-gray-500 dark:text-gray-400">A senha deve ter pelo menos 8 caracteres, incluir letras e números.</small>
              </div>
              <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Confirmar senha</label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  id="confirm_password"
                  className={`bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg 
focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark 
dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="•••••••••"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </div>





              <div className="flex items-start mb-6">
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Já tem conta?{" "}
                  <a
                    href="#"
                    onClick={backWithAlert}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Entre
                  </a>.
                </label>
              </div>
              <button type="submit" className="text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition">
                Cadastrar</button>
            </form>
          </div>
        </div>



      </div>

    </>
  );
}

export default Register;