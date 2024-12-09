using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("ocupacaoatual")]
    public class OcupacaoAtualModel
    {
        [Column("idocupacaoatual")]
        public int Id { get; set; }

        [Column("nomeocupacaoatual")]
        public string NomeOcupacaoAtual { get; set; }

        [Column("descricaoocupacaoatual")]
        public string? DescricaoOcupacaoAtual { get; set; }

        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}