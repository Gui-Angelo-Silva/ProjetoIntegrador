using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Enums.Status;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTOs.Entities
{
    public class TipoDocumentoEtapaDTO : IPosicao
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A posição é requerida!")]
		public int Posicao { get; set; }

		[Required(ErrorMessage = "O status é requerido!")]
        public StatusData Status { get; set; }

        [JsonIgnore]
		public TipoDocumentoDTO? TipoDocumentoDTO { get; set; }

		[Required(ErrorMessage = "O Tipo Documento é requerido!")]
		public int IdTipoDocumento { get; set; }

		[JsonIgnore]
		public EtapaDTO? EtapaDTO { get; set; }

		[Required(ErrorMessage = "A Etapa é requerida!")]
		public int IdEtapa { get; set; }


        public void Activate() => Status = StatusDataExtensions.Activate();
        public void Deactivate() => Status = StatusDataExtensions.Deactivate();
        public void Block() => Status = StatusDataExtensions.Block();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
