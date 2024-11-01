using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace SGED.Objects.Utilities
{
    public class Archive
    {
        [Required(ErrorMessage = "O hash é requerido!")]
        [MinLength(64, ErrorMessage = "O hash deve ter exatamente 64 caracteres.")]
        [MaxLength(64, ErrorMessage = "O hash deve ter exatamente 64 caracteres.")]
        public string Hash { get; set; } // Validação correta para requisição.

        [Required(ErrorMessage = "Os bytes são requeridos!")]
        [CustomValidation(typeof(Archive), nameof(ValidateBytes))]
        public byte[] Bytes { get; set; } // Validação personalizada para verificar se os bytes são válidos.

        [Required(ErrorMessage = "O nome do arquivo é requerido!")]
        [RegularExpression(@"^[^<>:""/\\|?*]+$", ErrorMessage = "O nome do arquivo contém caracteres inválidos.")]
        public string FileName { get; set; } // Validação para caracteres permitidos no nome.

        [Required(ErrorMessage = "O tipo do arquivo é requerido!")]
        [CustomValidation(typeof(Archive), nameof(ValidateMimeType))]
        public string MimeType { get; set; } // Validação personalizada para tipos MIME permitidos.

        // Validação personalizada para Bytes.
        public static ValidationResult ValidateBytes(byte[] bytes, ValidationContext context)
        {
            if (bytes == null || bytes.Length == 0)
            {
                return new ValidationResult("Os bytes devem ser válidos e não podem estar vazios.");
            }
            return ValidationResult.Success;
        }

        // Validação personalizada para MimeType.
        public static ValidationResult ValidateMimeType(string mimeType, ValidationContext context)
        {
            var validMimeTypes = new[] { ".pdf", ".doc", ".docx", ".csv", ".xlsx", ".txt" };
            if (!Array.Exists(validMimeTypes, type => type.Equals(mimeType, StringComparison.OrdinalIgnoreCase)))
            {
                return new ValidationResult("Tipo MIME inválido. Os tipos permitidos são: " + string.Join(", ", validMimeTypes));
            }
            return ValidationResult.Success;
        }

        public string GenerateHashSHA256()
        {
            byte[] hashBytes = SHA256.HashData(this.Bytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower(); // Converte para string hexadecimal
        }

        public bool CompareHashs()
        {
            string hash = GenerateHashSHA256();
            return hash.Equals(this.Hash);
        }
    }
}