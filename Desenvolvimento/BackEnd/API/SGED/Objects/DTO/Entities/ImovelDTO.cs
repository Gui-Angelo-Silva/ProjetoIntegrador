using SGED.Objects.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class ImovelDTO
    {
        public int Id { get; set; }

        public List<string>? ImagemImovel { get; set; }

        [Required(ErrorMessage = "Inscrição cadastral é requerida!")]
        public string InscricaoCadastral { get; set; }

        [Required(ErrorMessage = "CEP do imóvel é requerido!")]
        [MinLength(9)]
        [MaxLength(9)]
        public string CepImovel { get; set; }

        [Required(ErrorMessage = "Número do imóvel é requerido!")]
        [MinLength(1)]
        [MaxLength(6)]
        public string NumeroImovel { get; set; }

        [Required(ErrorMessage = "Área do terreno é requerida!")]
        public string AreaTerreno { get; set; }

        [Required(ErrorMessage = "Área construida é requerida!")]
        public string AreaConstruida { get; set; }

        [Required(ErrorMessage = "Condições do solo é requerido!")]
        public string CondicoesSolo { get; set; }

        [Required(ErrorMessage = "Valor venal é requerido!")]
        public string ValorVenal { get; set; }

        [Required(ErrorMessage = "Valor de mercado é requerido!")]
        public string ValorMercado { get; set; }

        public long[]? LocalizacaoGeografica { get; set; } = new long[2];

        [JsonIgnore]
        public LogradouroDTO? LogradouroDTO { get; set; }

        [Required(ErrorMessage = "Logradouro é requerido!")]
        public int IdLogradouro { get; set; }

        [JsonIgnore]
        public MunicipeDTO? ProprietarioDTO { get; set; }

        [Required(ErrorMessage = "Proprietário é requerido!")]
        public int IdProprietario { get; set; }

        [JsonIgnore]
        public MunicipeDTO? ContribuinteDTO { get; set; }

        [Required(ErrorMessage = "Contribuinte é requerido!")]
        public int IdContribuinte { get; set; }

        [JsonIgnore]
        public TopografiaDTO? TopografiaDTO { get; set; }

        [Required(ErrorMessage = "Topografia é requerido!")]
        public int IdTopografia { get; set; }

        [JsonIgnore]
        public MunicipeDTO? TipoUsoDTO { get; set; }

        [Required(ErrorMessage = "Tipo uso é requerido!")]
        public int IdTipoUso { get; set; }

        [JsonIgnore]
        public OcupacaoAtualDTO? OcupacaoAtualDTO { get; set; }

        [Required(ErrorMessage = "Contribuinte é requerido!")]
        public int IdOcupacaoAtual { get; set; }

        [JsonIgnore]
        public ICollection<InstalacaoDTO>? InstalacoesDTOs { get; set; }
    }
}
