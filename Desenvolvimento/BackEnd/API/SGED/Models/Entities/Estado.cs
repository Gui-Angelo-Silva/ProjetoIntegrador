namespace SGED.Models.Entities;
public class Estado
{
    public int Id { get; set; }
<<<<<<< HEAD
    public string NomeEstado { get; set; }
    public string UfEstado { get; set; }

=======
    public string? NomeEstado { get; set; }
    public string? UfEstado { get; set; }
>>>>>>> 0f6583d1afdf60c67b850bf4e5a7199aa0aff478
    public ICollection<Cidade>? Cidades { get; set; }
}
