using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("logradouro")]
    public class Logradouro
    {
        [Column("idlogradouro")]
        public int Id { get; set; }

        [Column("ceplogradouro")]
        public string Cep { get; set; }

        [Column("numeroInicial")]
        public string NumeroInicial { get; set; }

        [Column("numeroFinal")]
        public string NumeroFinal { get; set; }

        public Bairro? Bairro { get; set; }

        [ForeignKey("idbairro")]
        public int IdBairro { get; set; }

        public TipoLogradouro? TipoLogradouro { get; set; }

        [ForeignKey("idtipologradouro")]
        public int IdTipoLogradouro { get; set; }

        public ICollection<Imovel>? Imovels { get; set; }
    }
}
