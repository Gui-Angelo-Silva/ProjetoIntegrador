using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTO.Entities
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
        public StatusProcessConfiguration Status { get; set; }

		[JsonIgnore]
		public ICollection<DocumentoProcessoDTO>? DocumentosProcessoDTO { get; set; }


		public void Enable() => Status = StatusProcessConfigurationExtensions.Enable();
        public void Pending() => Status = StatusProcessConfigurationExtensions.Pending();
        public void Wait() => Status = StatusProcessConfigurationExtensions.Wait();
        public void Block() => Status = StatusProcessConfigurationExtensions.Block();
        public void Disable() => Status = StatusProcessConfigurationExtensions.Disable();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
