using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Interfaces;

namespace SGED.Objects.Utilities.StatusState
{
    public class HabilitadoState : IStatusState
    {
        public string State { get; } = "Habilitado";
        public bool CanEdit() => true;
        public bool CanRelate() => true;
        public bool CanToRemove() => true;
    }
}
