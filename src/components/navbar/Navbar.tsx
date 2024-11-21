import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import EditUserModal from '../editUser/EditUserModal';

function Navbar() {
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert('Usuário deslogado com sucesso');
    navigate('/login');
  }

  let navbarComponent;

  if (user.token !== '') {
    navbarComponent = (
      <div className="w-full text-white flex justify-center py-4 p-5">
        <div className="container flex justify-between text-lg ">
          <div className="text-2xl font-bold uppercase">ChatBoot</div>

          <div className="flex gap-4">
              <EditUserModal />          

              {/* <Link
              to={`/edit/${user.id}`}
            
              className="hover:underline cursor-pointer"
            >
              Editar perfil
            </Link> */}
            <Link
              to="/"
              onClick={logout}
              className="hover:underline cursor-pointer"
            >
              Sair
            </Link>
          </div>
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
