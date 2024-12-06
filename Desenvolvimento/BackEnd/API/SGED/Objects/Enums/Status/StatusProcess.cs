namespace SGED.Objects.Enums.Status
{
    public enum StatusProcess
    {
        OnHold = 0,
        InProgress = 1,
        InAnalysis = 2,
        Approved = 3,
        Disapproved = 4,
    }

    public static class StatusProcessExtensions
    {
        public static StatusProcess PutOnHold() => StatusProcess.OnHold;
        public static StatusProcess PutInProgress() => StatusProcess.InProgress;
        public static StatusProcess SendForAnalysis() => StatusProcess.InAnalysis;
        public static StatusProcess Approve() => StatusProcess.Approved;
        public static StatusProcess Disapprove() => StatusProcess.Disapproved;
    }
}
