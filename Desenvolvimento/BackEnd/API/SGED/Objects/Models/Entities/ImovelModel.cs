using SGED.Objects.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("imovel")]
    public class ImovelModel
    {
        [Column("idimovel")]
        public int Id { get; set; }

        [Column("imagemimovel")]
        public List<string>? ImagemImovel { get; set; }

        [Column("inscricaocadastral")]
        public string InscricaoCadastral { get; set; }

        [Column("numeroimovel")]
        public string NumeroImovel { get; set; }

        [Column("areaterreno")]
        public string AreaTerreno { get; set; }

        [Column("areacomstruida")]
        public string AreaConstruida { get; set; }

        [Column("condicoessolo")]
        public string CondicoesSolo { get; set; }

        [Column("valorvenal")]
        public string ValorVenal { get; set; }

        [Column("valormercado")]
        public string ValorMercado { get; set; }

        [Column("localizacaogeografica")]
        public long[]? LocalizacaoGeografica { get; set; } = new long[2];

        public LogradouroModel? Logradouro { get; set; }

        [Column("idlogradouro")]
        public int IdLogradouro { get; set; }

        public MunicipeModel? Proprietario { get; set; }

        [Column("idproprietario")]
        public int IdProprietario { get; set; }

        public MunicipeModel? Contribuinte { get; set; }

        [Column("idcontribuinte")]
        public int IdContribuinte { get; set; }

        public TopografiaModel? Topografia { get; set; }

        [Column("idtopografia")]
        public int IdTopografia { get; set; }

        public UsoModel? Uso { get; set; }

        [Column("iduso")]
        public int IdUso { get; set; }

        public OcupacaoAtualModel? OcupacaoAtual { get; set; }

        [Column("idocupacaoatual")]
        public int IdOcupacaoAtual { get; set; }


        public ICollection<ProcessoModel>? Processos { get; set; }
        public ICollection<InstalacaoModel>? Instalacoes { get; set; }
    }
}
