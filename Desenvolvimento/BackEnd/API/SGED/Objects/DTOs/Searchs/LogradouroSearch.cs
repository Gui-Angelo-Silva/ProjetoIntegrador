using SGED.Objects.DTOs.Entities;

namespace SGED.Objects.DTOs.Searchs
{
    public class LogradouroSearch
    {
        public int Id { get; set; }
        public string Cep { get; set; }
        public string RuaLogradouro { get; set; }
        public string NumeroInicial { get; set; }
        public string NumeroFinal { get; set; }
        public int IdBairro { get; set; }
        public int IdTipoLogradouro { get; set; }

        public BairroSearch? Bairro { get; set; }
        public TipoLogradouroDTO? TipoLogradouro { get; set; }
        public ICollection<ImovelDTO>? Imoveis { get; set; }
    }
}
