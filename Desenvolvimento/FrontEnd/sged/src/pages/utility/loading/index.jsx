import LogoSGED from "../../../assets/pages/LogoSGED.png";

export default function LoadingPage() {
  return (
    <div className="overlay flex justify-center items-center h-screen flex-col">
      <div className="loading-message flex flex-col items-center">
        <div className="relative flex justify-center items-center h-32 w-32">
          {/* Animação de carregamento girando */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#53A7A6] absolute"></div>

          {/* Imagem estática no centro */}
          <img src={LogoSGED} alt="Loading" className="max-w-[60px] max-h-[60px] z-10" />
        </div>

        {/* Texto centralizado abaixo do ícone de carregamento */}
        <h3 className="text-3xl font-semibold text-black text-center mt-6">Carregando...</h3>
      </div>
    </div>
  );
}
