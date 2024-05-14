import ImgImovel from "../../../../assets/card/ImgImovel.png"
import ImgEstado from "../../../../assets/card/ImgEstado.png";
import ImgCidade from "../../../../assets/card/ImgCidade.png";
import ImgLogradouro from "../../../../assets/card/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../../assets/card/ImgTipoLogradouro.png";
import ImgUsuario from "../../../../assets/card/ImgUsuarioAtualizada.png";
import ImgBairro from "../../../../assets/card/ImgBairro.png";
import ImgTipoUsuario from "../../../../assets/card/ImgTipoUsuarioAtualizada.png";
import ImgMunicipe from "../../../../assets/card/ImgMunicipeAtualizada.png";
import ImgEngenheiro from "../../../../assets/card/ImgEngenheiroAtualizada.png";
import ImgFiscal from "../../../../assets/card/ImgFiscalAtualizada.png";
import ImgAuditoria from "../../../../assets/card/ImgAuditoriaAtualizada.png";
//import ImgProcesso from "../../../../assets/card/ImgProcessoAtualizada.png";
import ImgTipoProcesso from "../../../../assets/card/ImgTipoProcessoAtualizada.png";
import ImgEtapa from "../../../../assets/card/ImgEtapaAtualizada.png";
import ImgTipoDocumento from "../../../../assets/card/ImgTipoDocumentoAtualizada.png";
//import ImgDocumentoProcesso from "../../../../assets/card/ImgDocumentoProcessoAtualizada.png";
import ImgTipoDocumentoEtapa from "../../../../assets/card/ImgTipoDocumentoEtapa.png";

import { useServer } from "../../../../routes/serverRoute";

function Cards() {

    const { addSegment, inDevelopment } = useServer();

    const dataCategory = {
        "Imóvel": [
            {
                onClick: () => addSegment("realstate"),
                image: ImgImovel,
                tooltip: "Abrir a Página de Controle de Imóvel",
                title: "Imóvel",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("state"),
                image: ImgEstado,
                tooltip: "Abrir a Página de Controle de Estado",
                title: "Estado",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("city"),
                image: ImgCidade,
                tooltip: "Abrir a Página de Controle de Cidade",
                title: "Cidade",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("neighborhood"),
                image: ImgBairro,
                tooltip: "Abrir a Página de Controle de Bairro",
                title: "Bairro",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("publicplace"),
                image: ImgLogradouro,
                tooltip: "Abrir a Página de Controle de Logradouro",
                title: "Logradouro",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("typepublicplace"),
                image: ImgTipoLogradouro,
                tooltip: "Abrir a Página de Controle de Tipo Logradouro",
                title: "Tipo Logradouro",
                module: "Imovel"
            }
        ],

        "Usuário": [
            {
                onClick: () => addSegment("user"),
                image: ImgUsuario,
                tooltip: "Abrir a Página de Controle de Usuário",
                title: "Usuário",
                module: "Usuario"
            },
            {
                onClick: () => addSegment("typeuser"),
                image: ImgTipoUsuario,
                tooltip: "Abrir a Página de Controle de Tipo Usuário",
                title: "Tipo Usuário",
                module: "Usuario"
            },
            {
                onClick: () => addSegment("citizen"),
                image: ImgMunicipe,
                tooltip: "Abrir a Página de Controle de Munícipe",
                title: "Munícipe",
                module: "Usuario"
            },
            {
                onClick: () => addSegment("engineer"),
                image: ImgEngenheiro,
                tooltip: "Abrir a Página de Controle de Engenheiro",
                title: "Engenheiro",
                module: "Usuario"
            },
            {
                onClick: () => addSegment("supervisor"),
                image: ImgFiscal,
                tooltip: "Abrir a Página de Controle de Fiscal",
                title: "Fiscal",
                module: "Usuario"
            },
            {
                onClick: () => inDevelopment("Controle de Auditoria"),
                image: ImgAuditoria,
                tooltip: "Abrir a Página de Controle de Auditoria",
                title: "Auditoria",
                module: "Usuario"
            },
        ],
        
        "Processo": [
            // {
            //     onClick: () => inDevelopment("Controle de Processo"),
            //     image: ImgProcesso,
            //     tooltip: "Abrir a Página de Controle de Processo",
            //     title: "Processo",
            //     module: "Processo"
            // },
            {
                onClick: () => addSegment("typeprocess"),
                image: ImgTipoProcesso,
                tooltip: "Abrir a Página de Controle de Tipo Processo",
                title: "Tipo Processo",
                module: "Processo"
            },
            {
                onClick: () => addSegment("stage"),
                image: ImgEtapa,
                tooltip: "Abrir a Página de Controle de Etapa",
                title: "Etapa",
                module: "Processo"
            },
            {
                onClick: () => addSegment("typedocument"),
                image: ImgTipoDocumento,
                tooltip: "Abrir a Página de Controle de Tipo Documento",
                title: "Tipo Documento",
                module: "Processo"
            },
            {
                onClick: () => addSegment("stagedocumenttype"),
                image: ImgTipoDocumentoEtapa,
                tooltip: "Abrir a Página de Controle de Tipo Documento Etapa",
                title: "Tipo Doc. Etapa",
                module: "Processo"
            }
            // {
            //     onClick: () => inDevelopment("Controle de Documento Processo"),
            //     image: ImgDocumentoProcesso,
            //     tooltip: "Abrir a Página de Controle de Documento Processo",
            //     title: "Doc. Processo",
            //     module: "Processo"
            // }
        ]
    }
    
    return dataCategory
}

export default Cards;