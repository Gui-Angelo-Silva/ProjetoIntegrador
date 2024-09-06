namespace SGED.Objects.Enums
{
    public enum StatusProcessModel
    {
        Created = 0,
        Pending = 1,
        Attached = 2,
        InAnalysis = 3,
        Approved = 4,
    }

    public static class StatusProcessModelExtensions
    {
        public static StatusProcessModel AssignDefaultState() => StatusProcessModel.Created;
        public static StatusProcessModel PutOnPending() => StatusProcessModel.Pending;
        public static StatusProcessModel MarkAsAttached() => StatusProcessModel.Attached;
        public static StatusProcessModel MoveToAnalysis() => StatusProcessModel.InAnalysis;
        public static StatusProcessModel Approve() => StatusProcessModel.Approved;
    }
}
