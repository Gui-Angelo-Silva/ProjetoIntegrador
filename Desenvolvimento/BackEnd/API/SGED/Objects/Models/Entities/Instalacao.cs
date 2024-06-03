using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("instalacao")]
    public class Instalacao
    {
        [Column("idinstalacao")]
        public int Id { get; set; }

        [Column("datainstalacao")]
        public string DataInstalacao { get; set; }

        [Column("situacaoinstalacao")]
        public string SituacaoInstalacao { get; set; }

        public Infraestrutura? Infraestrutura { get; set; }

        [ForeignKey("idinfraestrutura")]
        public int IdInfraestrutura { get; set; }

        public Imovel? Imovel { get; set; }

        [ForeignKey("idimovel")]
        public int IdImovel { get; set; }

        public Engenheiro? Engenheiro { get; set; }

        [ForeignKey("idengenheiro")]
        public int IdEngenheiro { get; set; }
    }
}