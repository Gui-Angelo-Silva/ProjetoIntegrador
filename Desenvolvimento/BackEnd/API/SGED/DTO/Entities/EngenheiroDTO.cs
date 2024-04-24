using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace SGED.DTO.Entities
{
	public class EngenheiroDTO : IPessoa
	{
		public int Id { get; set; }

        [Required(ErrorMessage = "A imagem é requerida!")]
        public string ImagemPessoa { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(5)]
        [MaxLength(70)]
        public string NomePessoa { get; set; }

        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string EmailPessoa { get; set; }

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

        public string CreaEngenheiro { get; set; }

		public virtual int Crea(string crea)
		{

			if (crea.Length == 9)
			{
				if (crea[5] == '/')
				{
					crea = crea.Trim();
					crea = crea.Replace(".", "").Replace("-", "");
					if (!Regex.IsMatch(crea, @"^\d+$")) return -1;

					var statusIdentity = IPessoaExtensions.VerificaIdentico(crea);

					if (VerificarCrea(crea) && !statusIdentity) return 1;
					else return -1;
				}
			}
			return 0;

		}
		public virtual bool VerificarCrea(string crea)
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