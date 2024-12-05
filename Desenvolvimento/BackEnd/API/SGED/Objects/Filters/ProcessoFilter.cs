using System;
using System.ComponentModel.DataAnnotations;

namespace SGED.Objects.Filters
{
    public class ProcessoFilter
    {
        public Guid Id { get; set; }

        [StringLength(50, ErrorMessage = "Identificação do processo deve ter nada ou até 50 caracteres.")]
        public string IdentificacaoProcesso { get; set; }

        [StringLength(500, ErrorMessage = "Descrição do processo deve ter no máximo 500 caracteres.")]
        public string DescricaoProcesso { get; set; }

        [StringLength(300, ErrorMessage = "Situação do processo deve ter no máximo 300 caracteres.")]
        public string SituacaoProcesso { get; set; }

        [CustomValidation(typeof(ProcessoFilter), nameof(ValidateDateRange))]
        public string[] DataInicio { get; set; }

        [CustomValidation(typeof(ProcessoFilter), nameof(ValidateDateRange))]
        public string[] DataFinalizacao { get; set; }

        [CustomValidation(typeof(ProcessoFilter), nameof(ValidateDateRange))]
        public string[] DataAprovacao { get; set; }

        [Range(-1, 4, ErrorMessage = "Status deve estar entre -1 (ausência de valor) e 4.")]
        public int Status { get; set; }

        public string InscricaoCadastral { get; set; }

        [StringLength(50, ErrorMessage = "Identificação do processo deve ter nada ou até 50 caracteres.")]
        public string NomeTipoProcesso { get; set; }

        [StringLength(70, ErrorMessage = "Identificação do processo deve ter nada ou até 70 caracteres.")]
        public string NomeEngenheiro { get; set; }

        [StringLength(70, ErrorMessage = "Identificação do processo deve ter nada ou até 70 caracteres.")]
        public string NomeFiscal { get; set; }

        [StringLength(70, ErrorMessage = "Identificação do processo deve ter nada ou até 70 caracteres.")]
        public string NomeResponsavel { get; set; }

        [StringLength(70, ErrorMessage = "Identificação do processo deve ter nada ou até 70 caracteres.")]
        public string NomeAprovador { get; set; }





        [Range(-1, 1, ErrorMessage = "Ordem para Identificação do Processo deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarIdentificacaoProcesso { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Descrição do Processo deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarDescricaoProcesso { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Situação do Processo deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarSituacaoProcesso { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Data de Início deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarDataInicio { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Data de Finalização deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarDataFinalizacao { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Data de Aprovação deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarDataAprovacao { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Status deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarStatus { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Id do Imóvel deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarInscricaoCadastral { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Tipo do Processo deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarNomeTipoProcesso { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Engenheiro deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarNomeEngenheiro { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Fiscal deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarNomeFiscal { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Responsável deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarNomeResponsavel { get; set; }

        [Range(-1, 1, ErrorMessage = "Ordem para Aprovador deve estar entre -1 (decrescente), 0 (não ordenar) e 1 (crescente).")]
        public int OrdenarNomeAprovador { get; set; }





        // Método de validação personalizada para os intervalos de datas
        public static ValidationResult ValidateDateRange(string[] dataRange, ValidationContext context)
        {
            if (dataRange == null) return ValidationResult.Success;

            for (int i = 0; i < dataRange.Length; i++)
            {
                // Verifica se a string está vazia ou com o valor "yyyy-MM-dd" sem números (ausência de valor)
                if (string.IsNullOrEmpty(dataRange[i]) || dataRange[i] == "yyyy-MM-dd")
                {
                    continue; // Não valida essa data
                }

                // Verifica se a data segue o formato "yyyy-MM-dd" e se os valores são numéricos
                if (!DateTime.TryParseExact(dataRange[i], "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out _))
                {
                    // Verifica se contém algum valor não numérico (por exemplo, se a parte do dia for 'dd' ao invés de um número)
                    var parts = dataRange[i].Split('-');
                    if (parts.Length == 3 &&
                        (parts[0].All(char.IsDigit) && parts[1].All(char.IsDigit) && parts[2].All(char.IsDigit)))
                    {
                        continue; // A data está correta, mas apenas contém números
                    }

                    // Se não for um valor válido, retorna erro
                    return new ValidationResult($"A data na posição {i + 1} deve estar no formato aaaa-mm-dd e conter números válidos.");
                }
            }

            return ValidationResult.Success;
        }

    }
}
