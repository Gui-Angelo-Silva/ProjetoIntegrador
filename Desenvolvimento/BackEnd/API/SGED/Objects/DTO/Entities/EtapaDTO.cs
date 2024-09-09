using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Enums.Status;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTO.Entities
{
    public class EtapaDTO : IPosicao
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome da etapa é requerido!")]
		[MinLength(3)]
		[MaxLength(50)]
		public string NomeEtapa { get; set; }

		[Required(ErrorMessage = "A descrição da etapa é requerida!")]
		[MinLength(5)]
		[MaxLength(250)]
		public string DescricaoEtapa { get; set; }

		[Required(ErrorMessage = "A posição é requerida!")]
		public int Posicao { get; set; }

		[Required(ErrorMessage = "O status é requerido!")]
        public StatusData Status { get; set; }

        [JsonIgnore]
		public TipoProcessoDTO? TipoProcessoDTO { get; set; }

		[Required(ErrorMessage = "O TipoProcesso é requerido!")]
		public int IdTipoProcesso { get; set; }

		[JsonIgnore]
		public ICollection<TipoDocumentoDTO>? TipoDocumentoDTO { get; set; }


        public void Activate() => Status = StatusDataExtensions.Activate();
        public void Deactivate() => Status = StatusDataExtensions.Deactivate();
        public void Block() => Status = StatusDataExtensions.Block();

        public string GetState() => IStatusStateExtensions.GetState(this.Status);
        public bool CanEdit() => IStatusStateExtensions.CanEdit(this.Status);
        public bool CanRelate() => IStatusStateExtensions.CanRelate(this.Status);
        public bool CanRemove() => IStatusStateExtensions.CanRemove(this.Status);
    }
}
