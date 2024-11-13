namespace SGED.Objects.DTO.Searchs
{
    public class EstadoSearch
    {
        public int Id { get; set; }
        public string NomeEstado { get; set; }
        public string UfEstado { get; set; }

        public ICollection<CidadeSearch>? Cidades { get; set; }
    }
}
