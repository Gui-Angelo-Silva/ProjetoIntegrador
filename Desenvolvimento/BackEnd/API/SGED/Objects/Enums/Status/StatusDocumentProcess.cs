namespace SGED.Objects.Enums.Status
{
    public enum StatusDocumentProcess
    {
        OnHold = 0,
        Pending = 1,
        Attached = 2,
        InAnalysis = 3,
        Approved = 4,
        Disapproved = 5,
    }

    public static class StatusDocumentProcessExtensions
    {
        public static StatusDocumentProcess AssignDefaultState() => StatusDocumentProcess.OnHold;
        public static StatusDocumentProcess PutOnPending() => StatusDocumentProcess.Pending;
        public static StatusDocumentProcess MarkAsAttached() => StatusDocumentProcess.Attached;
        public static StatusDocumentProcess MoveToAnalysis() => StatusDocumentProcess.InAnalysis;
        public static StatusDocumentProcess Approve() => StatusDocumentProcess.Approved;
        public static StatusDocumentProcess Disapprove() => StatusDocumentProcess.Disapproved;
    }
}
