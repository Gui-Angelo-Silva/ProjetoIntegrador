 namespace SGED.Models.Entities;
public class Cidade
{
    public int Id { get; set; }
    public string NomeCidade { get; set; }

    public Estado Estado { get; set; }
    public int IdEstado { get; set; }

}
