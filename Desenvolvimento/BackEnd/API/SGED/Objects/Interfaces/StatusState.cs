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
        private static IStatusState CreateState(StatusProcessConfiguration status)
        {
            return status switch
            {
                StatusProcessConfiguration.Habilitado => new HabilitadoState(),
                StatusProcessConfiguration.EmEspera => new EmEsperaState(),
                StatusProcessConfiguration.Bloqueado => new BloqueadoState(),
                StatusProcessConfiguration.Desativado => new DesativadoState(),
                _ => new HabilitadoState()
            };
        }

        public static string GetState(StatusProcessConfiguration status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.State;
        }

        public static bool CanEdit(StatusProcessConfiguration status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanEdit();
        }

        public static bool CanRelate(StatusProcessConfiguration status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanRelate();
        }

        public static bool CanRemove(StatusProcessConfiguration status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanToRemove();
        }
    }
}
