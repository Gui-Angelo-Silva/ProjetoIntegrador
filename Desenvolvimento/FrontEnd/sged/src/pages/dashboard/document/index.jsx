import { useServer } from "../../../routes/serverRoute";
import { useMontage } from '../../../object/modules/montage';
import { useEffect, useState } from "react";
import ImgProcesso from "../../../assets/card/ImgProcessoAtualizada.png";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import ImgDocumentoProcesso from "../../../assets/card/ImgDocumentoProcessoAtualizada.png";
import CardProcess from "../../../components/Card/CardProcess";

export default function Document() {

    const pages = [
        { name: 'Documentos', link: '', isEnabled: false }
    ];

    const [hoveredCard, setHoveredCard] = useState(null);
    const { componentMounted } = useMontage();

    const server = useServer();

    const cards = [
        {
            title: "Processo",
            imgSrc: ImgProcesso,
            onClick: () => server.currentRoute().addSegment("processos").dispatch(),
        },
        {
            title: "Doc. Processo",
            imgSrc: ImgDocumentoProcesso,
            onClick: () => server.currentRoute().addSegment("documentos-processos").dispatch(),
        },
    ];

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    return (
        <>
            <Breadcrumb pages={pages} />
            <div className="flex mt-10">
                {cards.map((card, index) => (
                    <CardProcess
                        key={index}
                        title={card.title}
                        imgSrc={card.imgSrc}
                        isHovered={hoveredCard === index}
                        onClick={card.onClick}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    />
                ))}
            </div>
        </>
    );
}