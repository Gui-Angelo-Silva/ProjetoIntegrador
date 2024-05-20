import { useServer } from "../../../routes/serverRoute";
import { useMontage } from '../../../object/modules/montage';
import { useEffect, useState } from "react";
import ImgProcesso from "../../../assets/card/ImgProcessoAtualizada.png";
import Title from "../../../components/Title/Title";
import Subtitle from "../../../components/Title/Subtitle";
import ImgDocumentoProcesso from "../../../assets/card/ImgDocumentoProcessoAtualizada.png";
import LayoutPage from "../../../components/Layout/LayoutPage";
import CardProcess from "../../../components/Card/CardProcess";

export default function Document() {
    const [hoveredCard, setHoveredCard] = useState(null);
    const { componentMounted } = useMontage();

    const { addSegment, inDevelopment } = useServer();

    const cards = [
        {
            title: "Processo",
            imgSrc: ImgProcesso,
            onClick: () => inDevelopment("Controle de Processo"),
        },
        {
            title: "Doc. Processo",
            imgSrc: ImgDocumentoProcesso,
            onClick: () => inDevelopment("Controle de Documento Processo"),
        },
    ];

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    return (
        <LayoutPage>
            <Title title="Processo" />
            <Subtitle subtitle="Funções" />
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
        </LayoutPage>
    );
}