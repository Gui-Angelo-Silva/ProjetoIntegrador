using System.ComponentModel.DataAnnotations;
using SGED.Objects.Interfaces;
using SGED.Objects.Interfaces.Pessoa;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTO.Entities
{
    public class TipoProcessoDTO : IStatus
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do TipoProcesso é requerido!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeTipoProcesso { get; set; }

        [Required(ErrorMessage = "A descrição do TipoProcesso é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string DescricaoTipoProcesso { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public Status Status { get; set; }


        public bool CanOperation() => IStatusExtensions.CanOperation(this);
        public bool CanRelationation() => IStatusExtensions.CanRelationation(this);
        public void DisableAllActions() => IStatusExtensions.DisableAllActions(this);
        public void DisableOperations() => IStatusExtensions.DisableOperations(this);
        public void EnableRelationation() => IStatusExtensions.EnableRelationation(this);
        public void EnableAllActions() => IStatusExtensions.EnableAllActions(this);
    }
}
