using SGED.Objects.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("imovel")]
    public class Imovel
    {
        [Column("idimovel")]
        public int Id { get; set; }

        [Column("imagemimovel")]
        public List<string>? ImagemImovel { get; set; }

        [Column("inscricaocadastral")]
        public string InscricaoCadastral { get; set; }

        [Column("cepimovel")]
        public string CepImovel { get; set; }

        [Column("numeroimovel")]
        public string NumeroImovel { get; set; }

        [Column("areaterreno")]
        public float AreaTerreno { get; set; }

        [Column("areacomstruida")]
        public float AreaConstruida { get; set; }

        [Column("condicoessolo")]
        public string CondicoesSolo { get; set; }

        [Column("valorvenal")]
        public float ValorVenal { get; set; }

        [Column("valormercado")]
        public float ValorMercado { get; set; }

        [Column("localizacaogeografica")]
        public long[]? LocalizacaoGeografica { get; set; } = new long[2];

        public Logradouro? Logradouro { get; set; }

        [ForeignKey("idlogradouro")]
        public int IdLogradouro { get; set; }

        public Municipe? Proprietario { get; set; }

        [ForeignKey("idproprietario")]
        public int IdProprietario { get; set; }

        public Municipe? Contribuinte { get; set; }

        [ForeignKey("idcontribuinte")]
        public int IdContribuinte { get; set; }

        public Topografia? Topografia { get; set; }

        [ForeignKey("idtopografia")]
        public int IdTopografia { get; set; }

        public TipoUso? TipoUso { get; set; }

        [ForeignKey("idtipouso")]
        public int IdTipoUso { get; set; }

        public OcupacaoAtual? OcupacaoAtual { get; set; }

        [ForeignKey("idocupacaoatual")]
        public int IdOcupacaoAtual { get; set; }

        public ICollection<Instalacao>? Instalacoes { get; set; }
    }
}
