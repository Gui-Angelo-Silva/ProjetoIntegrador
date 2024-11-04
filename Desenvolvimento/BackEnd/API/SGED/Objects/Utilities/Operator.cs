using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace SGED.Objects.Utilities
{
    public static class Operator
    {
        public static string GenerateHash(this string password)
        {
            if (string.IsNullOrEmpty(password)) return "";

            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = SHA256.HashData(bytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant(); // Retorna o hash em formato hexadecimal
        }

        public static string RemoveDiacritics(this string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;

            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new System.Text.StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }

        public static string ExtractNumbers(this string text)
        {
            if (string.IsNullOrEmpty(text))
                return string.Empty;

            return new string(text.Where(char.IsDigit).ToArray());
        }

        public static bool CompareString(string str1, string str2)
        {
            return string.Equals(str1.RemoveDiacritics(), str2.RemoveDiacritics(), StringComparison.OrdinalIgnoreCase);
        }

        public static bool IsNumbers(this string text)
        {
            return !string.IsNullOrEmpty(text) && Regex.IsMatch(text, @"^\d+$");
        }

        public static string RemoveAccents(string input)
        {
            if (string.IsNullOrEmpty(input))
                return string.Empty;

            // Normaliza a string e remove os caracteres acentuados
            var normalizedString = input.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                // Adiciona apenas os caracteres que não são acentuados
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Replace(" ", "").Replace("ç", "c"); // Remove espaços e substitui "ç"
        }
    }
}