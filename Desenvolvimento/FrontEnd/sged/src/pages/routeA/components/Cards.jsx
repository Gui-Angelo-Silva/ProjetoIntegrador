import ImgImovel from "../../../assets/imgImovel.png"
import ImgEstado from "../../../assets/imgEstado.png";
import ImgCidade from "../../../assets/ImgCidade.png";
import ImgLogradouro from "../../../assets/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../assets/ImgTipoLogradouro.png";
import ImgUsuario from "../../../assets/ImgUsuarioAtualizada.png";
import ImgBairro from "../../../assets/ImgBairro.png";
import ImgTipoUsuario from "../../../assets/ImgTipoUsuarioAtualizada.png";
import ImgMunicipe from "../../../assets/ImgMunicipeAtualizada.png";
import ImgEngenheiro from "../../../assets/ImgEngenheiroAtualizada.png";
import ImgFiscal from "../../../assets/ImgFiscalAtualizada.png";
import ImgAuditoria from "../../../assets/ImgAuditoriaAtualizada.png";
import ImgProcesso from "../../../assets/ImgProcessoAtualizada.png";
import ImgTipoProcesso from "../../../assets/ImgTipoProcessoAtualizada.png";
import ImgEtapa from "../../../assets/ImgEtapaAtualizada.png";
import ImgTipoDocumento from "../../../assets/ImgTipoDocumentoAtualizada.png";
import ImgDocumentoProcesso from "../../../assets/ImgDocumentoProcessoAtualizada.png";

import { useServer } from "../../../routes/serverRoute";
import { useState } from "react";

function Cards() {

    const { addSegment, inDevelopment } = useServer();

    const [isHoveredImovel, setIsHoveredImovel] = useState(false);
    const [isHoveredEstado, setIsHoveredEstado] = useState(false);
    const [isHoveredCidade, setIsHoveredCidade] = useState(false);
    const [isHoveredBairro, setIsHoveredBairro] = useState(false);
    const [isHoveredLogradouro, setIsHoveredLogradouro] = useState(false);
    const [isHoveredTipoLogradouro, setIsHoveredTipoLogradouro] = useState(false);

    const [isHoveredUsuario, setIsHoveredUsuario] = useState(false);
    const [isHoveredTipoUsuario, setIsHoveredTipoUsuario] = useState(false);
    const [isHoveredMunicipe, setIsHoveredMunicipe] = useState(false);
    const [isHoveredEngenheiro, setIsHoveredEngenheiro] = useState(false);
    const [isHoveredFiscal, setIsHoveredFiscal] = useState(false);
    const [isHoveredAuditoria, setIsHoveredAuditoria] = useState(false);

    const [isHoveredProcesso, setIsHoveredProcesso] = useState(false);
    const [isHoveredTipoProcesso, setIsHoveredTipoProcesso] = useState(false);
    const [isHoveredEtapa, setIsHoveredEtapa] = useState(false);
    const [isHoveredTipoDocumento, setIsHoveredTipoDocumento] = useState(false);
    const [isHoveredDocumentoProcesso, setIsHoveredDocumentoProcesso] = useState(false);





    const titles = ["Imóvel", "Usuário", "Processo"];

    const titleColors = {
        "Imóvel": { bg: "#c8d9db", hover: "#005A66", text: "#005A66" },
        "Usuário": { bg: "#cde3e7", hover: "#4DA8B6", text: "#4DA8B6" },
        "Processo": { bg: "#d1eaee", hover: "#59C3D3", text: "#59C3D3" },
    };

    const cards = {
        "Imóvel": ["Imóvel", "Estado", "Cidade", "Bairro", "Logradouro", "Tipo Logradouro"],
        "Usuário": ["Usuário", "Tipo Usuário", "Munícipe", "Engenheiro", "Fiscal", "Auditoria"],
        "Processo": ["Processo", "Tipo Processo", "Etapa", "Tipo Documento", "Documento Processo"]
    }
    
    const dataCards = {
        // Imóvel
        "Imóvel": [
            {
                onClick: () => inDevelopment("Controle de Imóvel"),
                mouseEnter: () => setIsHoveredImovel(true),
                mouseLeave: () => setIsHoveredImovel(false),
                image: ImgImovel,
                title: "Abrir a Página de Controle de Imóvel",
                filter: isHoveredImovel ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Estado": [
            {
                onClick: () => addSegment("state"),
                mouseEnter: () => setIsHoveredEstado(true),
                mouseLeave: () => setIsHoveredEstado(false),
                image: ImgEstado,
                title: "Abrir a Página de Controle de Estado",
                filter: isHoveredEstado ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Cidade": [
            {
                onClick: () => addSegment("city"),
                mouseEnter: () => setIsHoveredCidade(true),
                mouseLeave: () => setIsHoveredCidade(false),
                image: ImgCidade,
                title: "Abrir a Página de Controle de Cidade",
                filter: isHoveredCidade ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Bairro": [
            {
                onClick: () => inDevelopment("Controle de Bairro"),
                mouseEnter: () => setIsHoveredBairro(true),
                mouseLeave: () => setIsHoveredBairro(false),
                image: ImgBairro,
                title: "Abrir a Página de Controle de Bairro",
                filter: isHoveredBairro ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Logradouro": [
            {
                onClick: () => inDevelopment("Controle de Logradouro"),
                mouseEnter: () => setIsHoveredLogradouro(true),
                mouseLeave: () => setIsHoveredLogradouro(false),
                image: ImgLogradouro,
                title: "Abrir a Página de Controle de Logradouro",
                filter: isHoveredLogradouro ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Tipo Logradouro": [
            {
                onClick: () => addSegment("typepublicplace"),
                mouseEnter: () => setIsHoveredTipoLogradouro(true),
                mouseLeave: () => setIsHoveredTipoLogradouro(false),
                image: ImgTipoLogradouro,
                title: "Abrir a Página de Controle de Tipo Logradouro",
                filter: isHoveredTipoLogradouro ? 'brightness(0) invert(1)' : 'none'
            }
        ],

        // Usuário
        "Usuário": [
            {
                onClick: () => addSegment("user"),
                mouseEnter: () => setIsHoveredUsuario(true),
                mouseLeave: () => setIsHoveredUsuario(false),
                image: ImgUsuario,
                title: "Abrir a Página de Controle de Usuário",
                filter: isHoveredUsuario ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Tipo Usuário": [
            {
                onClick: () => addSegment("typeuser"),
                mouseEnter: () => setIsHoveredTipoUsuario(true),
                mouseLeave: () => setIsHoveredTipoUsuario(false),
                image: ImgTipoUsuario,
                title: "Abrir a Página de Controle de Tipo Usuário",
                filter: isHoveredTipoUsuario ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Munícipe": [
            {
                onClick: () => inDevelopment("Controle de Munícipe"),
                mouseEnter: () => setIsHoveredMunicipe(true),
                mouseLeave: () => setIsHoveredMunicipe(false),
                image: ImgMunicipe,
                title: "Abrir a Página de Controle de Munícipe",
                filter: isHoveredMunicipe ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Engenheiro": [
            {
                onClick: () => inDevelopment("Controle de Engenheiro"),
                mouseEnter: () => setIsHoveredEngenheiro(true),
                mouseLeave: () => setIsHoveredEngenheiro(false),
                image: ImgEngenheiro,
                title: "Abrir a Página de Controle de Engenheiro",
                filter: isHoveredEngenheiro ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Fiscal": [
            {
                onClick: () => inDevelopment("Controle de Fiscal"),
                mouseEnter: () => setIsHoveredFiscal(true),
                mouseLeave: () => setIsHoveredFiscal(false),
                image: ImgFiscal,
                title: "Abrir a Página de Controle de Fiscal",
                filter: isHoveredFiscal ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Auditoria": [
            {
                onClick: () => inDevelopment("Controle de Auditoria"),
                mouseEnter: () => setIsHoveredAuditoria(true),
                mouseLeave: () => setIsHoveredAuditoria(false),
                image: ImgAuditoria,
                title: "Abrir a Página de Controle de Auditoria",
                filter: isHoveredAuditoria ? 'brightness(0) invert(1)' : 'none'
            }
        ],

        // Processo
        "Processo": [
            {
                onClick: () => inDevelopment("Controle de Processo"),
                mouseEnter: () => setIsHoveredProcesso(true),
                mouseLeave: () => setIsHoveredProcesso(false),
                image: ImgProcesso,
                title: "Abrir a Página de Controle de Processo",
                filter: isHoveredProcesso ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Tipo Processo": [
            {
                onClick: () => inDevelopment("Controle de Tipo Processo"),
                mouseEnter: () => setIsHoveredTipoProcesso(true),
                mouseLeave: () => setIsHoveredTipoProcesso(false),
                image: ImgTipoProcesso,
                title: "Abrir a Página de Controle de Tipo Processo",
                filter: isHoveredTipoProcesso ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Etapa": [
            {
                onClick: () => inDevelopment("Controle de Etapa"),
                mouseEnter: () => setIsHoveredEtapa(true),
                mouseLeave: () => setIsHoveredEtapa(false),
                image: ImgEtapa,
                title: "Abrir a Página de Controle de Etapa",
                filter: isHoveredEtapa ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Tipo Documento": [
            {
                onClick: () => inDevelopment("Controle de Tipo Documento"),
                mouseEnter: () => setIsHoveredTipoDocumento(true),
                mouseLeave: () => setIsHoveredTipoDocumento(false),
                image: ImgTipoDocumento,
                title: "Abrir a Página de Controle de Tipo Documento",
                filter: isHoveredTipoDocumento ? 'brightness(0) invert(1)' : 'none'
            }
        ],
        "Documento Processo": [
            {
                onClick: () => inDevelopment("Controle de Documento Processo"),
                mouseEnter: () => setIsHoveredDocumentoProcesso(true),
                mouseLeave: () => setIsHoveredDocumentoProcesso(false),
                image: ImgDocumentoProcesso,
                title: "Abrir a Página de Controle de Documento Processo",
                filter: isHoveredDocumentoProcesso ? 'brightness(0) invert(1)' : 'none'
            }
        ]
    }

    return {
        titles,
        titleColors,
        cards,
        dataCards
    };

}

export default Cards;