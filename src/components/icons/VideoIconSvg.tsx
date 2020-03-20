import React, {FC, ReactElement} from "react";
import {SvgIconsProps} from "../../interfaces";

const VideoIconSvg: FC<SvgIconsProps> = ({color}: SvgIconsProps): ReactElement => (
   
    <svg className="progress-icon progress-icon--video" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 90">
        <g stroke={color} fill={color}>
            <path stroke-width="4" d="M68.5 89h-60C4.375 89 1 85.8065 1 81.9032V8.09677C1 4.19355 4.375 1 8.5 1h30.525c2.025 0 3.9.70968 5.325 2.05806L73.825 30.9484C75.25 32.2968 76 34.071 76 35.9871v45.9161C76 85.8065 72.625 89 68.5 89zM8.5 3.83871c-2.475 0-4.5 1.91613-4.5 4.25806V81.9032c0 2.342 2.025 4.2581 4.5 4.2581h60c2.475 0 4.5-1.9161 4.5-4.2581V35.9871c0-1.1355-.45-2.2-1.35-2.9806L42.175 5.11613c-.825-.85161-1.95-1.27742-3.15-1.27742H8.5z"/>
            <path stroke-width="3" d="M24.3999 63.125c-.525 0-1.125-.15-1.575-.45-.9-.525-1.425-1.5-1.425-2.55V32c0-1.05.525-2.025 1.425-2.55.9-.525 2.025-.6 2.925-.075l28.125 14.7c1.05.525 1.65 1.575 1.575 2.7 0 1.125-.675 2.175-1.725 2.625l-27.975 13.425c-.45.225-.9.3-1.35.3zm0-31.125v28.125L52.5249 46.7 24.3999 32z"/>
        </g>
    </svg>

);

export default VideoIconSvg;