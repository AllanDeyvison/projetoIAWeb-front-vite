import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LogoAprovIA from '../LogoAprovIA';


function Navbar() {
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  function logout() {
    if (window.confirm("Tem certeza que deseja sair?")) {
      handleLogout();
      alert('Usuário deslogado com sucesso');
      navigate('/login');
    }
  }

  let navbarComponent;

  if (user.token !== '') {
    navbarComponent = (
      <div className="w-full text-white flex justify-center p-3 rounded-t-2xl bg-neutral-800 "> 
      {/* sticky top-0 z-50 */}
        <div className="container flex justify-center ">
        <Link
          to="/home"
          className="flex items-center gap-2 text-2xl font-serif hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded transition"
          tabIndex={0}
          aria-label="Ir para a página inicial"
        >
          <LogoAprovIA />
        </Link>
          
        {/* <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
        
          {/* <div className="flex gap-2">
            {user?.userType === UserType.ADMIN && (
              <Link to="/admin" className="hover:bg-gray-700 rounded-xl"> Admin </Link>
            )}
            <button className="group flex w-full items-center gap-2 rounded-lg  data-focus:bg-white/10 hover:bg-gray-500">
              <PencilIcon className="size-5 fill-white" />
              <EditUserModal />
            </button>

            <button className="group flex w-full items-center gap-1 rounded-lg px-3 py-1.5 data-focus:bg-white/10 hover:bg-red-500 ">
              <Link to="/" onClick={logout} >Sair</Link>
              <ArrowRightStartOnRectangleIcon className="size-5 fill-white" />
            </button>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
