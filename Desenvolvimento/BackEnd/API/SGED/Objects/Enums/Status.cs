using SGED.Objects.Interfaces;

namespace SGED.Objects.Enums
{
    public enum StatusEnum
    {
        Habilitado = 1,
        Pendente = 2,
        EmEspera = 3,
        Bloqueado = 4,
        Desativado = 5
    }

    public static class StatusEnumExtensions
    {
        public static StatusEnum Enable() => StatusEnum.Habilitado;

        public static StatusEnum Pending() => StatusEnum.Pendente;

        public static StatusEnum Wait() => StatusEnum.EmEspera;

        public static StatusEnum Block() => StatusEnum.Bloqueado;

        public static StatusEnum Disable() => StatusEnum.Desativado;
    }
}
