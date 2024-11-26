using SGED.Objects.Enums.Status;

namespace SGED.Objects.Filters
{
    public class ProcessoFilter
    {
        public string? Id { get; set; }
        public string? IdentificacaoProcesso { get; set; }
        public string? DescricaoProcesso { get; set; }
        public string? SituacaoProcesso { get; set; }
        public string? DataInicio { get; set; }
        public string? DataFinalizacao { get; set; }
        public string? DataAprovacao { get; set; }
        public StatusProcess Status { get; set; }
        public int? IdImovel { get; set; }
        public int? IdTipoProcesso { get; set; }
        public int? IdEngenheiro { get; set; }
        public int? IdFiscal { get; set; }
        public int? IdResponsavel { get; set; }
        public int? IdAprovador { get; set; }
    }
}
