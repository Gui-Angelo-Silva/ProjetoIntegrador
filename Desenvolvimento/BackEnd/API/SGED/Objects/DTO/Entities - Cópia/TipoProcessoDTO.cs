using System.ComponentModel.DataAnnotations;
using SGED.Objects.Enums.Status;
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
        public StatusData Status { get; set; }


        public void Activate() => Status = StatusDataExtensions.Activate();
        public void Deactivate() => Status = StatusDataExtensions.Deactivate();
        public void Block() => Status = StatusDataExtensions.Block();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
