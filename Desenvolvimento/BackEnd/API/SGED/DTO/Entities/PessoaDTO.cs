using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SGED.DTO.Entities
{
    public class PessoaDTO
    {
        [Required(ErrorMessage = "A imagem é requerida!")]
        public string ImagemPessoa { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(5)]
        [MaxLength(70)]
        public string NomePessoa { get; set; }

        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string EmailPessoa
        {
            get => _emailPessoa;
            set => _emailPessoa = value?.ToLower();
        }
        private string _emailPessoa;

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string TelefonePessoa { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        public string CpfCnpjPessoa { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        public string RgIePessoa { get; set; }


        public virtual bool VerificaIdentico(string documento)
        {
            var statusIdentity = true;
            for (int i = 1; i < documento.Length; i++)
            {
                if (documento[i] != documento[0])
                    statusIdentity = false;
            }
            return statusIdentity;
        }

        public virtual int CpfCnpj(string cpfCnpj)
        {

            if (cpfCnpj.Length == 14)
            {
                if (cpfCnpj[3] == '.' || cpfCnpj[7] == '.' || cpfCnpj[11] == '-')
                {
                    cpfCnpj = cpfCnpj.Trim();
                    cpfCnpj = cpfCnpj.Replace(".", "").Replace("-", "");
                    if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -1;

                    var statusIdentity = VerificaIdentico(cpfCnpj);

                    if (VerificarCpf(cpfCnpj) && !statusIdentity) return 1;
                    else return -1;
                }
            }
            else if (cpfCnpj.Length == 18)
            {
                if (cpfCnpj[2] == '.' || cpfCnpj[6] == '.' || cpfCnpj[10] == '/' || cpfCnpj[15] == '-')
                {
                    cpfCnpj = cpfCnpj.Trim();
                    cpfCnpj = cpfCnpj.Replace(".", "").Replace("/", "").Replace("-", "");
                    if (!Regex.IsMatch(cpfCnpj, @"^\d+$")) return -2;

                    var statusIdentity = VerificaIdentico(cpfCnpj);

                    if (VerificarCnpj(cpfCnpj) && !statusIdentity) return 2;
                    else return -2;
                }
            }
            return 0;
        }

        public virtual bool VerificarCpf(string cpf)
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

        public virtual bool VerificarCnpj(string cnpj)
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

        public virtual int RgIe(string rgIe)
        {

            if (rgIe.Length == 12)
            {
                if (rgIe[2] == '.' || rgIe[6] == '.' || rgIe[10] == '-')
                {
                    rgIe = rgIe.Trim();
                    rgIe = rgIe.Replace(".", "").Replace("-", "");
                    if (!Regex.IsMatch(rgIe, @"^\d+$")) return -1;

                    var statusIdentity = VerificaIdentico(rgIe);

                    if (VerificarRg(rgIe) && !statusIdentity) return 1;
                    else return -1;
                }
            }
            else if (rgIe.Length == 15)
            {
                if (rgIe[3] == '.' || rgIe[7] == '.' || rgIe[11] == '.')
                {
                    rgIe = rgIe.Trim();
                    rgIe = rgIe.Replace(".", "");
                    if (!Regex.IsMatch(rgIe, @"^\d+$")) return -2;

                    var statusIdentity = VerificaIdentico(rgIe);

                    if (VerificarIe(rgIe) && !statusIdentity) return 2;
                    else return -2;
                }
            }
            return 0;
        }

        public virtual bool VerificarRg(string rg)
        {
            int[] multiplicador1 = new int[8] { 2, 3, 4, 5, 6, 7, 8, 9 };
            string digito;
            int soma;
            int resto;
            soma = 0;

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

        public virtual bool VerificarIe(string ie)
        {
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