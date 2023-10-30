using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace SGED.DTO.Entities
{
    public class PessoaDTO
    {
        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        public string NomePessoa { get; set; }

        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string EmailPessoa { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(19)]
        public string TelefonePessoa { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        public string CpfCnpjPessoa { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        public string RgIEPessoa { get; set; }


        public static int CpfCnpj(string cpfCnpj)
        {

            if (cpfCnpj.Length == 14)
            {
                if (cpfCnpj[3] == '.' || cpfCnpj[7] == '.' || cpfCnpj[11] == '-')
                {
                    cpfCnpj = cpfCnpj.Trim();
                    cpfCnpj = cpfCnpj.Replace(".", "").Replace("-", "");
                    if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -3;

                    if (verificarCpf(cpfCnpj)) return 1;
                    else return -1;
                }
            }
            else
            {
                if (cpfCnpj[2] == '.' || cpfCnpj[6] == '.' || cpfCnpj[10] == '/' || cpfCnpj[15] == '-')
                {
                    cpfCnpj = cpfCnpj.Trim();
                    cpfCnpj = cpfCnpj.Replace(".", "").Replace("/", "").Replace("-", "");
                    if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -3;

                    if (verificarCnpj(cpfCnpj)) return 2;
                    else return -2;
                }
            }
            return 0;
        }

        public static bool verificarCpf(string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");
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

        public static bool verificarCnpj(string cnpj)
        {
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
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

        public static int RgIe(string rgIe)
        {

            if (rgIe.Length == 12)
            {
                if (rgIe[2] == '.' || rgIe[6] == '.' || rgIe[10] == '-')
                {
                    rgIe = rgIe.Trim();
                    rgIe = rgIe.Replace(".", "").Replace("-", "");
                    if (!Regex.IsMatch(rgIe, @"^\d+$")) return -3;

                    if (verificarRg(rgIe)) return 1;
                    else return -1;
                }
            }
            else
            {
                if (rgIe[3] == '.' || rgIe[7] == '.' || rgIe[11] == '.')
                {
                    rgIe = rgIe.Trim();
                    rgIe = rgIe.Replace(".", "");
                    if (!Regex.IsMatch(rgIe, @"^\d+$")) return -3;

                    if (verificarIe(rgIe)) return 2;
                    else return -2;
                }
            }
            return 0;
        }


    }
}
