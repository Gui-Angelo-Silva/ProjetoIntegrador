import { useState } from "react";

function PositionInterface() {
    const [position, setPosition] = useState(0);

    return {
        // Atributos
        position,
        setPosition
    };
}

export default PositionInterface;