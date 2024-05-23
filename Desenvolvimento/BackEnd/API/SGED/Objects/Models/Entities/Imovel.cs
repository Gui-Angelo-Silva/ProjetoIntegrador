using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("imovel")]
    public class Imovel
    {
        [Column("idimovel")]
        public int Id { get; set; }

        [Column("inscricaocadastral")]
        public string InscricaoCadastral { get; set; }

        [Column("numeroimovel")]
        public string NumeroCasa { get; set; }

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

        public Logradouro? Logradouro { get; set; }

        [ForeignKey("idlogradouro")]
        public int IdLogradouro { get; set; }

        public Municipe? Proprietario { get; set; }

        [ForeignKey("idproprietario")]
        public int IdProprietario { get; set; }

        public Municipe? Contribuinte { get; set; }

        [ForeignKey("idcontribuinte")]
        public int IdContribuinteo { get; set; }
    }
}
