using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("cidade")]
    public class CidadeModel
    {
        [Column("idcidade")]
        public int Id { get; set; }

        [Column("nomecidade")]
        public string NomeCidade { get; set; }

        public EstadoModel? Estado { get; set; }

        [Column("idestado")]
        public int IdEstado { get; set; }

        public ICollection<BairroModel>? Bairros { get; set; }
    }
}