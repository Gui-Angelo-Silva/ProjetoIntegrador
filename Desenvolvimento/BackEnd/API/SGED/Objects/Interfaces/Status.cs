using System.ComponentModel.DataAnnotations;

namespace SGED.Objects.Interfaces
{
    public interface IStatus
    {
        [Required(ErrorMessage = "O status é requerido!")]
        bool Status { get; set; }
    }

    public static class StatusExtensions
    {
        public static void Ativar(IStatus status)
        {
            status.Status = true;
        }

        public static void Inativar(IStatus status)
        {
            status.Status = false;
        }
    }
}