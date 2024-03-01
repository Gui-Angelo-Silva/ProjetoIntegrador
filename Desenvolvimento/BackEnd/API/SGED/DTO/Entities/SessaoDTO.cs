using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class SessaoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "A dade e hora de abertura é requerida!")]
        public string DataHoraAbertura { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");

        public string? DataHoraFechamento { get; set; }

        public string? TokenSessao { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public Boolean StatusSessao { get; set; } = true;


        //[JsonIgnore]
        public UsuarioDTO? UsuarioDTO { get; set; }

        public int IdUsuario { get; set; }

    }
}
