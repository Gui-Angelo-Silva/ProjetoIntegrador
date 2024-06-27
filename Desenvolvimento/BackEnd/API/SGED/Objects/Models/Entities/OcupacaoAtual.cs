using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("ocupacaoatual")]
    public class OcupacaoAtual
    {
        [Column("idocupacaoatual")]
        public int Id { get; set; }

        [Column("nomeocupacaoatual")]
        public string NomeOcupacaoAtual { get; set; }

        [Column("descricaoocupacaoatual")]
        public string? DescricaoOcupacaoAtual { get; set; }

        public ICollection<Imovel>? Imoveis { get; set; }
    }
}