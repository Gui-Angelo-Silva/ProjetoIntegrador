using SGED.Objects.Interfaces;

namespace SGED.Objects.Utilities
{
    public enum Status
    {
        All = 0,
        Relation = 1,
        Reading = 2
    }

    public static class StatusExtensions
    {
        public static bool CanOperation(this Status status)
        {
            return status <= Status.All;
        }

        public static bool CanRelationation(this Status status)
        {
            return status <= Status.Relation;
        }
    }
}
