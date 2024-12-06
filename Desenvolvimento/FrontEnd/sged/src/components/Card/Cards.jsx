import ImgImovel from "../../assets/card/ImgImovelAtualizada.png";
import ImgEstado from "../../assets/card/ImgEstado.png";
import ImgCidade from "../../assets/card/ImgCidade.png";
import ImgLogradouro from "../../assets/card/ImgLogradouro.png";
import ImgTipoLogradouro from "../../assets/card/ImgTipoLogradouro.png";
import ImgUsuario from "../../assets/card/ImgUsuarioAtualizada.png";
import ImgBairro from "../../assets/card/ImgBairro.png";
import ImgTipoUsuario from "../../assets/card/ImgTipoUsuarioAtualizada.png";
import ImgMunicipe from "../../assets/card/ImgMunicipeAtualizada.png";
import ImgEngenheiro from "../../assets/card/ImgEngenheiroAtualizada.png";
import ImgFiscal from "../../assets/card/ImgFiscalAtualizada.png";
import ImgAuditoria from "../../assets/card/ImgAuditoriaAtualizada.png";
import ImgTipoProcesso from "../../assets/card/ImgTipoProcessoAtualizada.png";
import ImgEtapa from "../../assets/card/ImgEtapaAtualizada.png";
import ImgTipoDocumento from "../../assets/card/ImgTipoDocumentoAtualizada.png";
import ImgTipoDocumentoEtapa from "../../assets/card/ImgTipoDocumentoEtapa.png";    
import ImgTipoInfraestrutura from "../../assets/card/ImgTipoInfraestrutra.png";
import ImgInfraestrutura from "../../assets/card/ImgInfraestrutura.png";
import ImgOcupacaoAtual from "../../assets/card/ImgOcupacaoAtual.png";
import ImgTopografia from "../../assets/card/ImgTopografia.png";
import ImgUso from "../../assets/card/ImgUso.png";
import ImgInstalacao from "../../assets/card/ImgInstalacao.png";

import { useServer } from "../../routes/serverRoute";

function Cards() {

    const server = useServer();

    const dataCategory = {
        "Endereço e Imóvel": [
            {
                onClick: () => server.currentRoute().addSegment("estado").dispatch(),
                image: ImgEstado,
                tooltip: "Abrir a Página de Controle de Estado",
                title: "Estado",
                module: "Endereço e Imóvel"
            },
            {
                onClick: () => server.currentRoute().addSegment("cidade").dispatch(),
                image: ImgCidade,
                tooltip: "Abrir a Página de Controle de Cidade",
                title: "Cidade",
                module: "Endereço e Imóvel"
            },
            {
                onClick: () => server.currentRoute().addSegment("bairro").dispatch(),
                image: ImgBairro,
                tooltip: "Abrir a Página de Controle de Bairro",
                title: "Bairro",
                module: "Endereço e Imóvel"
            },
            {
                onClick: () => server.currentRoute().addSegment("tipo-logradouro").dispatch(),
                image: ImgTipoLogradouro,
                tooltip: "Abrir a Página de Controle de Tipo Logradouro",
                title: "Tipo Logradouro",
                module: "Endereço e Imóvel"
            },
            {
                onClick: () => server.currentRoute().addSegment("logradouro").dispatch(),
                image: ImgLogradouro,
                tooltip: "Abrir a Página de Controle de Logradouro",
                title: "Logradouro",
                module: "Endereço e Imóvel"
            },
            {
                onClick: () => server.currentRoute().addSegment("imovel").dispatch(),
                image: ImgImovel,
                tooltip: "Abrir a Página de Controle de Imóvel",
                title: "Imóvel",
                module: "Endereço e Imóvel"
            }
        ],

        "Dados Adicionais": [
            {
                onClick: () => server.currentRoute().addSegment("tipo-infraestrutura").dispatch(),
                image: ImgTipoInfraestrutura,
                tooltip: "Abrir a Página de Controle de Tipo Infraestrutura",
                title: "Tipo Infraest.",
                module: "Dados Adicionais"
            },
            {
                onClick: () => server.currentRoute().addSegment("infraestrutura").dispatch(),
                image: ImgInfraestrutura,
                tooltip: "Abrir a Página de Controle de Infraestrutura",
                title: "Infraestrutura",
                module: "Dados Adicionais"
            },
            {
                onClick: () => server.currentRoute().addSegment("uso").dispatch(),
                image: ImgUso,
                tooltip: "Abrir a Página de Controle de Uso",
                title: "Uso",
                module: "Dados Adicionais"
            },
            {
                onClick: () => server.currentRoute().addSegment("ocupacao-atual").dispatch(),
                image: ImgOcupacaoAtual,
                tooltip: "Abrir a Página de Controle de Ocupação Atual",
                title: "Ocupação Atual",
                module: "Dados Adicionais"
            },
            {
                onClick: () => server.currentRoute().addSegment("topografia").dispatch(),
                image: ImgTopografia,
                tooltip: "Abrir a Página de Controle de Topografia",
                title: "Topografia",
                module: "Dados Adicionais"
            },
            {
                onClick: () => server.currentRoute().addSegment("instalacao").dispatch(),
                image: ImgInstalacao,
                tooltip: "Abrir a Página de Controle de Instalação",
                title: "Instalação",
                module: "Dados Adicionais"
            },
        ],

        "Usuários e Pessoas": [
            {
                onClick: () => server.currentRoute().addSegment("tipo-usuario").dispatch(),
                image: ImgTipoUsuario,
                tooltip: "Abrir a Página de Controle de Tipo Usuário",
                title: "Tipo Usuário",
                module: "Usuários e Pessoas"
            },
            {
                onClick: () => server.currentRoute().addSegment("usuario").dispatch(),
                image: ImgUsuario,
                tooltip: "Abrir a Página de Controle de Usuário",
                title: "Usuário",
                module: "Usuários e Pessoas"
            },
            {
                onClick: () => server.currentRoute().addSegment("municipe").dispatch(),
                image: ImgMunicipe,
                tooltip: "Abrir a Página de Controle de Munícipe",
                title: "Munícipe",
                module: "Usuários e Pessoas"
            },
            {
                onClick: () => server.currentRoute().addSegment("engenheiro").dispatch(),
                image: ImgEngenheiro,
                tooltip: "Abrir a Página de Controle de Engenheiro",
                title: "Engenheiro",
                module: "Usuários e Pessoas"
            },
            {
                onClick: () => server.currentRoute().addSegment("fiscal").dispatch(),
                image: ImgFiscal,
                tooltip: "Abrir a Página de Controle de Fiscal",
                title: "Fiscal",
                module: "Usuários e Pessoas"
            },
            {
                onClick: () => server.inDevelopment("Controle de Auditoria"),
                image: ImgAuditoria,
                tooltip: "Abrir a Página de Controle de Auditoria",
                title: "Auditoria",
                module: "Usuários e Pessoas"
            },
        ],
        
        "Configuração de Processo": [
            {
                onClick: () => server.currentRoute().addSegment("tipo-processo").dispatch(),
                image: ImgTipoProcesso,
                tooltip: "Abrir a Página de Controle de Tipo Processo",
                title: "Tipo Processo",
                module: "Configuração de Processo"
            },
            {
                onClick: () => server.currentRoute().addSegment("etapa").dispatch(),
                image: ImgEtapa,
                tooltip: "Abrir a Página de Controle de Etapa",
                title: "Etapa",
                module: "Configuração de Processo"
            },
            {
                onClick: () => server.currentRoute().addSegment("tipo-documento").dispatch(),
                image: ImgTipoDocumento,
                tooltip: "Abrir a Página de Controle de Tipo Documento",
                title: "Tipo Documento",
                module: "Configuração de Processo"
            },
            {
                onClick: () => server.currentRoute().addSegment("etapa-tipo-documento").dispatch(),
                image: ImgTipoDocumentoEtapa,
                tooltip: "Abrir a Página de Controle de Tipo Documento Etapa",
                title: "Tipo Doc. Etapa",
                module: "Configuração de Processo"
            }
            // {
            //     onClick: () => server.inDevelopment("Controle de Documento Processo"),
            //     image: ImgDocumentoProcesso,
            //     tooltip: "Abrir a Página de Controle de Documento Processo",
            //     title: "Doc. Processo",
            //     module: "Configuração de Processo"
            // }
        ]
    }
    
    return dataCategory
}

export default Cards;