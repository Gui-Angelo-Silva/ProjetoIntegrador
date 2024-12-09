namespace SGED.Objects.DTOs.Searchs
{
    public class BairroSearch
    {
        public int Id { get; set; }
        public string NomeBairro { get; set; }
        public int IdCidade { get; set; }

        public CidadeSearch? Cidade { get; set; }
        public ICollection<LogradouroSearch>? Logradouros { get; set; }
    }
}
