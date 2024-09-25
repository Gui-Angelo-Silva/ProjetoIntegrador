using SGED.Objects.Enums.Status;
using SGED.Objects.Utilities.StatusState;

namespace SGED.Objects.Interfaces
{
    public interface IStatusState
    {
        string State { get; }
        bool CanEdit();
        bool CanRelate();
        bool CanToRemove();
    }

    public static class IStatusStateExtensions
    {
        private static IStatusState CreateState(StatusData status)
        {
            return status switch
            {
                StatusData.Active => new AtivoState(),
                StatusData.Inactivated => new InativoState(),
                StatusData.Blocked => new BloqueadoState(),
                _ => new AtivoState()
            };
        }

        public static string GetState(StatusData status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.State;
        }

        public static bool CanEdit(StatusData status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanEdit();
        }

        public static bool CanRelate(StatusData status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanRelate();
        }

        public static bool CanRemove(StatusData status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanToRemove();
        }
    }
}
