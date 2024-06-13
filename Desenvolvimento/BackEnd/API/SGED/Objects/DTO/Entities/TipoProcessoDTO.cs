using System.ComponentModel.DataAnnotations;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;

namespace SGED.Objects.DTO.Entities
{
    public class TipoProcessoDTO
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
        public StatusEnum Status { get; set; }


        public void Enable() => Status = StatusEnumExtensions.Enable();
        public void Pending() => Status = StatusEnumExtensions.Pending();
        public void Wait() => Status = StatusEnumExtensions.Wait();
        public void Block() => Status = StatusEnumExtensions.Block();
        public void Disable() => Status = StatusEnumExtensions.Disable();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
