using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Enums.Status;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTOs.Entities
{
    public class TipoDocumentoDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome do TipoDocumento é requerido!")]
		[MinLength(3)]
		[MaxLength(40)]
		public string NomeTipoDocumento { get; set; }

		[Required(ErrorMessage = "A descrição do TipoDocumento é requerida!")]
		[MinLength(5)]
		[MaxLength(450)]
		public string DescricaoTipoDocumento { get; set; }

		[Required(ErrorMessage = "O status é requerido!")]
        public StatusData Status { get; set; }

		[JsonIgnore]
		public ICollection<DocumentoProcessoDTO>? DocumentosProcessoDTO { get; set; }


        public void Activate() => Status = StatusDataExtensions.Activate();
        public void Deactivate() => Status = StatusDataExtensions.Deactivate();
        public void Block() => Status = StatusDataExtensions.Block();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
