using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("logradouro")]
    public class LogradouroModel
    {
        [Column("idlogradouro")]
        public int Id { get; set; }

        [Column("ceplogradouro")]
        public string Cep { get; set; }

        [Column("rualogradouro")]
        public string RuaLogradouro { get; set; }

        [Column("numeroInicial")]
        public string NumeroInicial { get; set; }

        [Column("numeroFinal")]
        public string NumeroFinal { get; set; }

        public BairroModel? Bairro { get; set; }

        [Column("idbairro")]
        public int IdBairro { get; set; }

        public TipoLogradouroModel? TipoLogradouro { get; set; }

        [Column("idtipologradouro")]
        public int IdTipoLogradouro { get; set; }

        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}
