using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("cidade")]
    public class Cidade
    {
        [Column("idcidade")]
        public int Id { get; set; }

        [Column("cidade")]
        public string NomeCidade { get; set; }

        public Estado? Estado { get; set; }

        [ForeignKey("idestado")]
        public int IdEstado { get; set; }

        public ICollection<Bairro>? Bairros { get; set; }
    }
}