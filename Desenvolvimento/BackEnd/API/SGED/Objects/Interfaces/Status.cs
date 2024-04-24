using SGED.Objects.Utilities;

namespace SGED.Objects.Interfaces
{
    public interface IStatus
    {
        Status Status { get; set; }
    }

    public static class IStatusExtensions
    {
        public static bool CanOperation(IStatus statusHolder)
        {
            return StatusExtensions.CanOperation(statusHolder.Status);
        }

        public static bool CanRelationation(IStatus statusHolder)
        {
            return StatusExtensions.CanRelationation(statusHolder.Status);
        }

        public static void DisableOperations(IStatus statusHolder)
        {
            statusHolder.Status = Status.Relation;
        }

        public static void DisableAllActions(IStatus statusHolder)
        {
            statusHolder.Status = Status.Reading;
        }

        public static void EnableAllActions(IStatus statusHolder)
        {
            statusHolder.Status = Status.All;
        }

        public static void EnableRelationation(IStatus statusHolder)
        {
            statusHolder.Status = Status.Relation;
        }
    }
}
