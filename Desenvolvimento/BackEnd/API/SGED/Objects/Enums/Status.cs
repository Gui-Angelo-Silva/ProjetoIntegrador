using SGED.Objects.Interfaces;

namespace SGED.Objects.Enums
{
    public enum StatusEnum
    {
        Habilitado,
        EmEspera,
        Bloqueado,
        Desativado
    }

    public static class StatusEnumExtensions
    {
        public static StatusEnum Enable() => StatusEnum.Habilitado;

        public static StatusEnum Wait() => StatusEnum.EmEspera;

        public static StatusEnum Block() => StatusEnum.Bloqueado;

        public static StatusEnum Disable() => StatusEnum.Desativado;
    }
}
