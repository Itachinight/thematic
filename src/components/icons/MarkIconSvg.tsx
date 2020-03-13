import React, {FC, ReactElement} from "react";
import {SvgIconsProps} from "../../interfaces";

const MarkIconSvg: FC<SvgIconsProps> = ({color}: SvgIconsProps): ReactElement => (
    <svg className="progress-icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="344.000000pt"
         height="344.000000pt" viewBox="0 0 344.000000 344.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,344.000000) scale(0.100000,-0.100000)" fill={color} stroke={color}>
            <path
                strokeWidth={15}
                d="M356 3418 c-14 -20 -16 -185 -16 -1563 l0 -1542 23 -21 c21 -20 34 -22 134 -22 l111 0 4 -114 c2 -95 6 -117 22 -135 l19 -21 1208 0 1208 0 15 22 c14 20 16 185 16 1563 l0 1542 -23 21 c-21 20 -34 22 -134 22 l-111 0 -4 114 c-2 95 -6 117 -22 135 l-19 21 -1208 0 -1208 0 -15 -22z m2324 -1558 l0 -1440 -1095 0 -1095 0 0 1440 0 1440 1095 0 1095 0 0 -1440z m270 -280 l0 -1440 -1095 0 -1095 0 0 65 0 65 1009 0 c978 0 1009 1 1032 19 l24 19 3 1356 2 1356 60 0 60 0 0 -1440z"
            />
            <path
                strokeWidth={30}
                d="M1650 2205 l0 -75 222 0 223 0 -255 -255 -255 -255 -137 137 -138 138 -270 -270 -270 -270 52 -52 53 -53 215 215 215 215 138 -137 137 -138 310 310 310 310 0 -223 0 -222 70 0 70 0 0 350 0 350 -345 0 -345 0 0 -75z"
            />
        </g>
    </svg>
);

export default MarkIconSvg;