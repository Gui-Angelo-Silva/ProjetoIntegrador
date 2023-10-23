namespace SGED.Models.Entities
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public string EmailUsuario { get; set; }
        public string SenhaUsuario { get; set; }
        public string CargoUsuario { get; set; }
        public Boolean StatusUsuario { get; set; }

        public TipoUsuario TipoUsuario { get; set; }
        public int IdTipoUsuario { get; set; }
    }
}
