namespace SGED.Objects.DTOs.Searchs
{
    public class CidadeSearch
    {
        public int Id { get; set; }
        public string NomeCidade { get; set; }
        public int IdEstado { get; set; }

        public EstadoSearch? Estado { get; set; }
        public ICollection<BairroSearch>? Bairros { get; set; }
    }
}
