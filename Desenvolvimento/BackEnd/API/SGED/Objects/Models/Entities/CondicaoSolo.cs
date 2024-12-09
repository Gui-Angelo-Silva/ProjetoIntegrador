using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("condicaosolo")]
    public class CondicaoSolo
    {
        [Column("idcondicaosolo")]
        public int Id { get; set; }

        [Column("condicaosolo")]
        public string Condicao { get; set; }

        [Column("ufestado")]
        public string Descricao { get; set; }

        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}