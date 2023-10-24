namespace SGED.Models.Entities
{
	public class TipoUsuario
	{
		public int Id { get; set; }
		public string NivelAcesso { get; set; }
		public string NomeTipoUsuario { get; set; }
		public string DescricaoTipoUsuario { get; set; }

        public ICollection<Usuario>? Usuarios { get; set; }
    }
}
