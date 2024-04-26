using SGED.Objects.Utilities;

namespace SGED.Objects.Interfaces
{
    public interface IStatus
    {
        bool Status { get; set; }
    }

    public static class IStatusExtensions
    {
        public static void DisableAllOperations(IStatus status)
        {
            status.Status = false;
        }

        public static void EnableAllOperations(IStatus status)
        {
            status.Status = true;
        }
    }
}
