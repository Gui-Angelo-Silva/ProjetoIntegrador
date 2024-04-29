using Org.BouncyCastle.Utilities;
using SGED.Objects.Utilities;

namespace SGED.Objects.Interfaces
{
    public interface IPosicao
    {
        int Posicao { get; set; }
    }

    public static class IPosicaoExtensions
    {
        public static void OrderByPosition(List<IPosicao> objetos)
        {
            objetos = objetos.OrderBy(objeto => objeto.Posicao).ToList();
        }
    }
}
