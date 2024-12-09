using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("instalacao")]
    public class InstalacaoModel
    {
        [Column("idinstalacao")]
        public int Id { get; set; }

        [Column("datainstalacao")]
        public string DataInstalacao { get; set; }

        [Column("situacaoinstalacao")]
        public string SituacaoInstalacao { get; set; }

        public InfraestruturaModel? Infraestrutura { get; set; }

        [Column("idinfraestrutura")]
        public int IdInfraestrutura { get; set; }

        public ImovelModel? Imovel { get; set; }

        [Column("idimovel")]
        public int IdImovel { get; set; }

        public EngenheiroModel? Engenheiro { get; set; }

        [Column("idengenheiro")]
        public int? IdEngenheiro { get; set; }
    }
}