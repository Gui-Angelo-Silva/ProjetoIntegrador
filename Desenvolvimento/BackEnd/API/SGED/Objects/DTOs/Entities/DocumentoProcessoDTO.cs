using SGED.DTOs.Entities;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class DocumentoProcessoDTO
	{
		public Guid Id { get; set; }

        [Required(ErrorMessage = "A descrição é requerida!")]
        [MaxLength(50)]
        public string IdentificacaoDocumento { get; set; }

        [MaxLength(300)]
        public string DescricaoDocumento { get; set; }

		[MaxLength(300)]
		public string ObservacaoDocumento { get; set; }

        [MaxLength(64)]
        public string HashDocumento { get; set; }

        // Propriedade interna para armazenar o array de bytes
        public byte[]? ArquivoDocumento { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public StatusDocumentProcess Status { get; set; }

        [Required(ErrorMessage = "O processo é requerido!")]
        public Guid IdProcesso { get; set; }

        [Required(ErrorMessage = "O documento etapa é requerido!")]
        public int IdTipoDocumentoEtapa { get; set; }

        public int? IdResponsavel { get; set; }

        public int? IdAprovador { get; set; }


        [JsonIgnore]
        public ProcessoDTO? ProcessoDTO { get; set; }
        [JsonIgnore]
        public TipoDocumentoEtapaDTO? TipoDocumentoEtapaDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? ResponsavelDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? AprovadorDTO { get; set; }


        public void AssignDefaultState() => Status = StatusDocumentProcessExtensions.AssignDefaultState();
        public void PutOnPending() => Status = StatusDocumentProcessExtensions.PutOnPending();
        public void MarkAsNotAttached() => Status = StatusDocumentProcessExtensions.MarkAsNotAttached();
        public void MarkAsNotIntact() => Status = StatusDocumentProcessExtensions.MarkAsNotIntact();
        public void MarkAsAttached() => Status = StatusDocumentProcessExtensions.MarkAsAttached();
        public void SendForAnalysis() => Status = StatusDocumentProcessExtensions.SendForAnalysis();
        public void Approve() => Status = StatusDocumentProcessExtensions.Approve();
        public void Disapprove() => Status = StatusDocumentProcessExtensions.Disapprove();

        public string GenerateHashSHA256()
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(this.ArquivoDocumento);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower(); // Converte para string hexadecimal
            }
        }

        // Método para determinar o tipo MIME do arquivo
        public bool IsPDF()
        {
            var fileBytes = this.ArquivoDocumento;

            // Checa se o arquivo tem ao menos o tamanho mínimo para um PDF (mágico + EOF)
            if (fileBytes.Length < 1024) // Escolha um tamanho mínimo razoável
            {
                return false;
            }

            // Verifica se começa com a assinatura de um PDF (%PDF)
            if (fileBytes[0] == 0x25 && fileBytes[1] == 0x50 && fileBytes[2] == 0x44 && fileBytes[3] == 0x46)
            {
                // Verifica se termina com a assinatura de um PDF (%%EOF)
                string pdfEndSignature = "%%EOF";
                byte[] pdfEndBytes = System.Text.Encoding.ASCII.GetBytes(pdfEndSignature);
                int length = fileBytes.Length;

                for (int i = 0; i < pdfEndBytes.Length; i++)
                {
                    if (fileBytes[length - pdfEndBytes.Length + i] != pdfEndBytes[i])
                    {
                        return false; // Se qualquer byte não corresponder, não é um PDF válido
                    }
                }

                // Se passou nas duas checagens, o arquivo tem estrutura básica de um PDF
                return true;
            }

            return false; // Não tem a assinatura correta
        }

    }

}