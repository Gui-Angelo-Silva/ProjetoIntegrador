using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("cidade")]
    public class Cidade
    {
        [Column("idcidade")]
        public int Id { get; set; }

        [Column("nomecidade")]
        public string NomeCidade { get; set; }

        public Estado? Estado { get; set; }

        [Column("idestado")]
        public int IdEstado { get; set; }

        public ICollection<Bairro>? Bairros { get; set; }
    }
}