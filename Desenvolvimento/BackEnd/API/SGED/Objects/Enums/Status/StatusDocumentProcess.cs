namespace SGED.Objects.Enums.Status
{
    public enum StatusDocumentProcess
    {
        OnHold = 0,
        Pending = 1,
        NotAttached = 2,
        NotIntact = 3,
        Attached = 4,
        InAnalysis = 5,
        Approved = 6,
        Disapproved = 7,
    }

    public static class StatusDocumentProcessExtensions
    {
        public static StatusDocumentProcess AssignDefaultState() => StatusDocumentProcess.OnHold;
        public static StatusDocumentProcess PutOnPending() => StatusDocumentProcess.Pending;
        public static StatusDocumentProcess MarkAsNotAttached() => StatusDocumentProcess.NotAttached;
        public static StatusDocumentProcess MarkAsNotIntact() => StatusDocumentProcess.NotIntact;
        public static StatusDocumentProcess MarkAsAttached() => StatusDocumentProcess.Attached;
        public static StatusDocumentProcess SendForAnalysis() => StatusDocumentProcess.InAnalysis;
        public static StatusDocumentProcess Approve() => StatusDocumentProcess.Approved;
        public static StatusDocumentProcess Disapprove() => StatusDocumentProcess.Disapproved;
    }
}
