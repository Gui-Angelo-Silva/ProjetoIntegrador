using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Interfaces;

namespace SGED.Objects.Utilities.StatusState
{
    public class InativoState : IStatusState
    {
        public string State { get; } = "Inativado";
        public bool CanEdit() => false;
        public bool CanRelate() => false;
        public bool CanToRemove() => true;
    }
}
