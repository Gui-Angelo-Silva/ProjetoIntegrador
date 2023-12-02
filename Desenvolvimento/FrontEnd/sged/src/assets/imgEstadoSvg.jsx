import { tv } from 'tailwind-variants';
import React, { useState } from 'react';

export default function ImgEstadoSvg() {
    const [hover, setHover] = useState(false);
    const style = tv({
        base: 'flex flex-col text-green-800',
        variants: {
            hovered: {
                true: 'bg-[#58AFAE] scale-105 text-green-200',
                false: 'bg-[#DAEEEE] text-green-800'
            }
        }
    })

    return (
        <div className={style({ hovered: hover ? true : false })} style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                Estado
            </p>
            <div style={{ width: 165, height: 104, alignItems: 'center' }}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="165" height="104" viewBox="0 0 165.000000 104.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,104.000000) scale(0.100000,-0.100000)"
                        fill={hover ? '#daeeee' : '#015965'} stroke="none">
                        <path d="M490 985 c-7 -8 -18 -15 -26 -15 -7 0 -25 -16 -40 -35 -14 -19 -32
                        -35 -40 -35 -18 0 -64 -62 -64 -87 0 -11 -7 -26 -15 -33 -8 -7 -19 -29 -25
                        -50 -6 -21 -17 -41 -26 -44 -8 -3 -12 -11 -9 -17 4 -6 -2 -20 -12 -32 -11 -12
                        -27 -34 -36 -49 -9 -14 -41 -40 -72 -58 -30 -17 -55 -32 -55 -34 0 -1 32 -2
                        70 -3 39 -1 74 -5 79 -8 5 -2 11 2 15 10 4 13 9 13 40 0 20 -8 49 -15 65 -15
                        36 0 121 -35 121 -50 0 -7 5 -8 13 -3 6 4 36 8 66 8 46 0 58 -4 87 -31 31 -28
                        35 -37 37 -90 1 -40 8 -65 20 -79 33 -36 47 -74 37 -101 -9 -24 -9 -24 44 -24
                        73 0 83 -5 78 -39 -4 -27 -2 -28 27 -25 26 3 32 0 37 -22 7 -28 24 -27 39 3
                        18 35 37 54 90 88 27 17 59 42 70 55 23 25 86 60 110 60 9 0 25 10 35 23 15
                        18 27 22 66 20 27 -1 50 -6 52 -12 5 -16 32 -13 32 4 0 9 -6 12 -15 9 -28 -11
                        -16 26 13 39 15 6 33 18 41 25 7 7 20 11 27 8 16 -6 19 10 5 19 -11 6 11 54
                        31 66 7 5 23 9 35 9 24 0 50 35 33 45 -5 3 -20 3 -33 0 -18 -5 -30 0 -45 15
                        l-21 22 -44 -21 c-24 -11 -58 -21 -75 -21 -25 0 -32 -4 -32 -20 0 -14 -7 -20
                        -22 -21 -13 -1 -37 -3 -55 -5 -28 -3 -32 0 -38 27 -4 16 -17 41 -30 54 -26 25
                        -26 58 -3 138 14 45 1 61 -42 53 -21 -4 -28 1 -39 26 -8 18 -15 52 -16 77 0
                        25 -6 55 -12 66 -5 11 -8 26 -6 33 3 7 -5 24 -16 36 -19 21 -27 22 -64 14 -23
                        -5 -57 -10 -75 -13 -93 -10 -112 -17 -112 -36 0 -10 -4 -19 -10 -19 -5 0 -10
                        9 -10 20 0 22 -16 27 -22 8 -3 -7 -12 -9 -22 -5 -13 5 -17 14 -14 32 3 13 1
                        22 -3 19 -5 -3 -15 -2 -21 2 -7 5 -33 9 -58 10 -47 2 -85 8 -111 19 -9 3 -21
                        -1 -29 -10z"/>
                    </g>
                </svg>
            </div>
        </div>
    )
}