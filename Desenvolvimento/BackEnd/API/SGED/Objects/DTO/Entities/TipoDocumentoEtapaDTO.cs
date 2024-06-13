using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTO.Entities
{
	public class TipoDocumentoEtapaDTO : IPosicao
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A posição é requerida!")]
		public int Posicao { get; set; }

		[Required(ErrorMessage = "O status é requerido!")]
        public StatusEnum Status { get; set; }

        [JsonIgnore]
		public TipoDocumentoDTO? TipoDocumentoDTO { get; set; }

		[Required(ErrorMessage = "O Tipo Documento é requerido!")]
		public int IdTipoDocumento { get; set; }

		[JsonIgnore]
		public EtapaDTO? EtapaDTO { get; set; }

		[Required(ErrorMessage = "A Etapa é requerida!")]
		public int IdEtapa { get; set; }


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
