using System;
using System.ComponentModel.DataAnnotations;

namespace SGED.Objects.Filters
{
    public class ProcessoFilter
    {
        public int Pagina { get; set; }
        public int QuantidadeElementos { get; set; }

        public string Id { get; set; }
        public string IdentificacaoProcesso { get; set; }
        public string DescricaoProcesso { get; set; }
        public string SituacaoProcesso { get; set; }
        public string DataInicio1 { get; set; }
        public string DataInicio2 { get; set; }
        public string DataFinalizacao1 { get; set; }
        public string DataFinalizacao2 { get; set; }
        public string DataAprovacao1 { get; set; }
        public string DataAprovacao2 { get; set; }
        public int Status { get; set; }
        public string InscricaoCadastral { get; set; }
        public string NomeTipoProcesso { get; set; }
        public string NomeEngenheiro { get; set; }
        public string NomeFiscal { get; set; }
        public string NomeResponsavel { get; set; }
        public string NomeAprovador { get; set; }





        public int OrdenarIdentificacaoProcesso { get; set; }
        public int OrdenarDescricaoProcesso { get; set; }
        public int OrdenarSituacaoProcesso { get; set; }
        public int OrdenarDataInicio { get; set; }
        public int OrdenarDataFinalizacao { get; set; }
        public int OrdenarDataAprovacao { get; set; }
        public int OrdenarStatus { get; set; }
        public int OrdenarInscricaoCadastral { get; set; }
        public int OrdenarNomeTipoProcesso { get; set; }
        public int OrdenarNomeEngenheiro { get; set; }
        public int OrdenarNomeFiscal { get; set; }
        public int OrdenarNomeResponsavel { get; set; }
        public int OrdenarNomeAprovador { get; set; }
    }
}
