import logoAprovIA from '/logoSimplesAprovIA.png';

function LogoAprovIA({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) {
  return (
    <img
      src={logoAprovIA}
      alt="Logo AprovIA"
      className={`h-10 w-auto select-none ${className}`}
      style={style}
      draggable={false}
    />
  );
}

export default LogoAprovIA;
