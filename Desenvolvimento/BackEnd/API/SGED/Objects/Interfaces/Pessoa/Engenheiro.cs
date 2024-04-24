using SGED.Objects.Interfaces.Pessoa;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SGED.DTO.Entities
{
    public interface IEngenheiro
    {
        string CreaEngenheiro { get; set; }
    }

    public static class IEngenheiroExtensions
    {
        public static int Crea(this IEngenheiro engenheiro)
        {
            if (engenheiro.CreaEngenheiro.Length == 8)
            {
                if (engenheiro.CreaEngenheiro[5] == '/')
                {
                    var crea = engenheiro.CreaEngenheiro.Trim();
                    crea = crea.Replace(".", "").Replace("-", "");
                    if (!Regex.IsMatch(crea, @"^\d+$")) return -1;

                    var statusIdentity = IPessoaExtensions.VerificaIdentico(crea);

                    if (VerificarCrea(crea) && !statusIdentity) return 1;
                    else return -1;
                }
            }
            return 0;
        }

        public static bool VerificarCrea(string crea)
        {
            // Verifica se o CREA tem o tamanho correto
            if (crea.Length != 9)
                return false;

            int[] multiplicador1 = new int[8] { 5, 4, 3, 2, 9, 8, 7, 6 };
            int[] multiplicador2 = new int[9] { 6, 5, 4, 3, 2, 9, 8, 7, 6 };
            string tempCREA;
            string digito;
            int soma;
            int resto;
            crea = crea.Trim();
            crea = crea.Replace("/", "");
            tempCREA = crea.Substring(0, 8);
            soma = 0;

            for (int i = 0; i < 8; i++)
                soma += int.Parse(tempCREA[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            resto = 11 - resto;
            if (resto >= 10)
                resto = 0;
            digito = resto.ToString();
            tempCREA = tempCREA + digito;
            soma = 0;
            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCREA[i].ToString()) * multiplicador2[i];
            resto = soma % 11;
            resto = 11 - resto;
            if (resto >= 10)
                resto = 0;
            digito = digito + resto.ToString();
            return crea.EndsWith(digito);
        }
    }
}