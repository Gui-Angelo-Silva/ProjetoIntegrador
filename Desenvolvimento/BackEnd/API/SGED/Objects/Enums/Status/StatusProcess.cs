namespace SGED.Objects.Enums.Status
{
    public enum StatusProcess
    {
        Created = 0,
        InProgress = 1,
        InAnalysis = 2,
        Approved = 3,
        Disapproved = 4,
    }

    public static class StatusProcessExtensions
    {
        public static StatusProcess AssignDefaultState() => StatusProcess.Created;
        public static StatusProcess PutInProgress() => StatusProcess.InProgress;
        public static StatusProcess MoveToAnalysis() => StatusProcess.InAnalysis;
        public static StatusProcess Approve() => StatusProcess.Approved;
        public static StatusProcess Disapprove() => StatusProcess.Disapproved;
    }
}
