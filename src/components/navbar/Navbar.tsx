import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LogoAprovIA from '../LogoAprovIA';
import { useModelContext } from '@/contexts/ModelContext';


function Navbar() {
  const { user } = useContext(AuthContext);
  const { model } = useModelContext();

  let navbarComponent;

  // Defina o nome e cor do tutor conforme o modelo
  const tutorInfo = model === 'qwen2-math'
    ? { label: 'Matemática', color: 'bg-blue-600 bg-opacity-30 text-white' }
    : { label: 'Inglês', color: 'bg-red-600 bg-opacity-30 text-white' };


if (user.token !== '') {
  navbarComponent = (
    <div className={`w-full text-white flex p-3 rounded-t-2xl ${tutorInfo.color}`}>
      <div className="container flex items-center relative mx-auto">
        {/* Espaço à esquerda */}
        <div className="w-32" />
        {/* Logo centralizada */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/home"
            className="flex items-center gap-2 text-2xl font-serif hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded transition"
            tabIndex={0}
            aria-label="Ir para a página inicial"
          >
            <LogoAprovIA />
          </Link>
        </div>
        {/* Label da matéria à direita */}
        <span
          className="ml-auto font-semibold text-sm px-3 py-1 rounded-full"
          aria-label={`Tutor atual: ${tutorInfo.label}`}
        >
          {tutorInfo.label}
        </span>
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
