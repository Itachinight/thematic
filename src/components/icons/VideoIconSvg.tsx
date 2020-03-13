import React, {FC, ReactElement} from "react";
import {SvgIconsProps} from "../../interfaces";

const VideoIconSvg: FC<SvgIconsProps> = ({color}: SvgIconsProps): ReactElement => (
    <svg className="progress-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" xmlSpace="preserve">
        <g stroke={color}>
            <path
                d="M104,126H24c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h40.7c2.7,0,5.2,1,7.1,2.9l39.3,39.3     c1.9,1.9,2.9,4.4,2.9,7.1V116C114,121.5,109.5,126,104,126z M24,6c-3.3,0-6,2.7-6,6v104c0,3.3,2.7,6,6,6h80c3.3,0,6-2.7,6-6V51.3     c0-1.6-0.6-3.1-1.8-4.2L68.9,7.8C67.8,6.6,66.3,6,64.7,6H24z"
                strokeWidth={5}
            />
            <path
                d="M45.2,91.5c-0.7,0-1.5-0.2-2.1-0.6c-1.2-0.7-1.9-2-1.9-3.4V50c0-1.4,0.7-2.7,1.9-3.4     c1.2-0.7,2.7-0.8,3.9-0.1l37.5,19.6c1.4,0.7,2.2,2.1,2.1,3.6c0,1.5-0.9,2.9-2.3,3.5L47,91.1C46.4,91.4,45.8,91.5,45.2,91.5z      M45.2,50v37.5l37.5-17.9L45.2,50z"
                strokeWidth={4}
            />
        </g>
    </svg>
);

export default VideoIconSvg;