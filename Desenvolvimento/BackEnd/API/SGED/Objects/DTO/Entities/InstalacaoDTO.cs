using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class InstalacaoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "A data da instalação é requerida!")]
        [MinLength(10)]
        [MaxLength(10)]
        public string DataInstalacao { get; set; }

        [Required(ErrorMessage = "A situação da instalação é requerida!")]
        public string SituacaoInstalacao { get; set; }

        [JsonIgnore]
        public InfraestruturaDTO? InfraestruturaDTO { get; set; }

        [Required(ErrorMessage = "A infraestrutura é requerida!")]
        public int IdInfraestrutura { get; set; }

        [JsonIgnore]
        public ImovelDTO? ImovelDTO { get; set; }

        [Required(ErrorMessage = "O imóvel é requerido!")]
        public int IdImovel { get; set; }

        [JsonIgnore]
        public EngenheiroDTO? EngenheiroDTO { get; set; }

        public int? IdEngenheiro { get; set; }
    }
}
