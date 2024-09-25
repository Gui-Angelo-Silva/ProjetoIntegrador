namespace SGED.Objects.Enums.Status
{
    public enum StatusData
    {
        Active = 1,
        Inactivated = 2,
        Blocked = 3
    }

    public static class StatusDataExtensions
    {
        public static StatusData Activate() => StatusData.Active;
        public static StatusData Deactivate() => StatusData.Inactivated;
        public static StatusData Block() => StatusData.Blocked;
    }
}
