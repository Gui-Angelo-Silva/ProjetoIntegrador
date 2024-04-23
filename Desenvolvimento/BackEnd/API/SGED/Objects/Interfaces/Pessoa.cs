using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SGED.DTO.Entities
{
    public interface IPessoa
    {
        [Required(ErrorMessage = "A imagem é requerida!")]
        string ImagemPessoa { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(5)]
        [MaxLength(70)]
        string NomePessoa { get; set; }

        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        string EmailPessoa { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(15)]
        string TelefonePessoa { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        string CpfCnpjPessoa { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        string RgIePessoa { get; set; }
    }

    public static class PessoaExtensions
    {
        public static bool VerificaIdentico(this IPessoa pessoa, string documento)
        {
            var statusIdentity = true;
            for (int i = 1; i < documento.Length; i++)
            {
                if (documento[i] != documento[0])
                    statusIdentity = false;
            }
            return statusIdentity;
        }

        public static int CpfCnpj(this IPessoa pessoa, string cpfCnpj)
        {
            cpfCnpj = cpfCnpj.Trim().Replace(".", "").Replace("-", "").Replace("/", "");

            if (cpfCnpj.Length == 11)
            {
                if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -1;

                var statusIdentity = pessoa.VerificaIdentico(cpfCnpj);

                if (pessoa.VerificarCpf(cpfCnpj) && !statusIdentity) return 1;
                else return -1;
            }
            else if (cpfCnpj.Length == 14)
            {
                if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -2;

                var statusIdentity = pessoa.VerificaIdentico(cpfCnpj);

                if (pessoa.VerificarCnpj(cpfCnpj) && !statusIdentity) return 2;
                else return -2;
            }

            return 0;
        }

        public static bool VerificarCpf(this IPessoa pessoa, string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            cpf = cpf.Trim().Replace(".", "").Replace("-", "");

            if (cpf.Length != 11) return false;

            tempCpf = cpf.Substring(0, 9);
            soma = 0;

            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cpf.EndsWith(digito);
        }

        public static bool VerificarCnpj(this IPessoa pessoa, string cnpj)
        {
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
            cnpj = cnpj.Trim().Replace(".", "").Replace("-", "").Replace("/", "");

            if (cnpj.Length != 14) return false;

            tempCnpj = cnpj.Substring(0, 12);
            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cnpj.EndsWith(digito);
        }

        public static int RgIe(this IPessoa pessoa, string rgIe)
        {
            rgIe = rgIe.Trim().Replace(".", "").Replace("-", "");

            if (rgIe.Length == 9)
            {
                if (!Regex.IsMatch(rgIe, @"^\d+$")) return -1;

                var statusIdentity = pessoa.VerificaIdentico(rgIe);

                if (pessoa.VerificarRg(rgIe) && !statusIdentity) return 1;
                else return -1;
            }
            else if (rgIe.Length == 12)
            {
                if (!Regex.IsMatch(rgIe, @"^\d+$")) return -2;

                var statusIdentity = pessoa.VerificaIdentico(rgIe);

                if (pessoa.VerificarIe(rgIe) && !statusIdentity) return 2;
                else return -2;
            }
            return 0;
        }

        public static bool VerificarRg(this IPessoa pessoa, string rg)
        {
            int[] multiplicador1 = new int[8] { 2, 3, 4, 5, 6, 7, 8, 9 };
            string digito;
            int soma;
            int resto;
            soma = 0;

            if (rg.Length != 9) return false;

            for (int i = 0; i < 8; i++)
                soma += int.Parse(rg[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            return rg.EndsWith(digito);
        }

        public static bool VerificarIe(this IPessoa pessoa, string ie)
        {
            ie = ie.Trim().Replace(".", "").Replace("-", "");

            if (ie.Length != 12) return false;

            string strBase2 = ie.Substring(1, 8);
            int intSoma = 0;
            int intPeso = 1;

            for (int intPos = 0; intPos < 8; intPos++)
            {
                int intValor = int.Parse(ie[intPos].ToString());
                intValor *= intPeso;
                intSoma += intValor;
                intPeso++;

                if (intPeso == 2)
                {
                    intPeso = 3;
                }

                if (intPeso == 9)
                {
                    intPeso = 10;
                }
            }

            int intResto = intSoma % 11;
            string strDigito1 = intResto.ToString().Substring(intResto.ToString().Length - 1);
            strBase2 = ie.Substring(0, 8) + strDigito1 + ie.Substring(9, 3);

            return strBase2 == ie;
        }
    }
}