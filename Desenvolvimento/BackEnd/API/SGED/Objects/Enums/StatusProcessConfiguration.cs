using SGED.Objects.Interfaces;

namespace SGED.Objects.Enums
{
    public enum StatusProcessConfiguration
    {
        Habilitado = 1,
        Pendente = 2,
        EmEspera = 3,
        Bloqueado = 4,
        Desativado = 5
    }

    public static class StatusProcessConfigurationExtensions
    {
        public static StatusProcessConfiguration Enable() => StatusProcessConfiguration.Habilitado;

        public static StatusProcessConfiguration Pending() => StatusProcessConfiguration.Pendente;

        public static StatusProcessConfiguration Wait() => StatusProcessConfiguration.EmEspera;

        public static StatusProcessConfiguration Block() => StatusProcessConfiguration.Bloqueado;

        public static StatusProcessConfiguration Disable() => StatusProcessConfiguration.Desativado;
    }
}
