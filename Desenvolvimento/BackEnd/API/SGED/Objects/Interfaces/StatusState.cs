using SGED.Objects.Enums;
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
        private static IStatusState CreateState(StatusEnum status)
        {
            return status switch
            {
                StatusEnum.Habilitado => new HabilitadoState(),
                StatusEnum.EmEspera => new EmEsperaState(),
                StatusEnum.Bloqueado => new BloqueadoState(),
                StatusEnum.Desativado => new DesativadoState(),
                _ => new HabilitadoState()
            };
        }

        public static string GetState(StatusEnum status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.State;
        }

        public static bool CanEdit(StatusEnum status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanEdit();
        }

        public static bool CanRelate(StatusEnum status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanRelate();
        }

        public static bool CanRemove(StatusEnum status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanToRemove();
        }
    }
}
