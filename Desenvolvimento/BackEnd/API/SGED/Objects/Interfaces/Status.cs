using SGED.Objects.Helpers;

namespace SGED.Objects.Interfaces
{
    public interface IStatus
    {
        Status Status { get; set; }
    }

    public static class StatusUtilities
    {
        public static void DisableOperations(IStatus statusHolder)
        {
            statusHolder.Status = Status.Relation;
        }

        public static void DisableAllActions(IStatus statusHolder)
        {
            statusHolder.Status = Status.Reading;
        }

        public static void EnableOperations(IStatus statusHolder)
        {
            statusHolder.Status = Status.All;
        }

        public static void EnableRelationation(IStatus statusHolder)
        {
            statusHolder.Status = Status.Relation;
        }
    }
}
