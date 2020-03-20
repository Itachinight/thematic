import React, {FC, ReactElement} from "react";
import {SvgIconsProps} from "../../interfaces";

const MarkIconSvg: FC<SvgIconsProps> = ({color}: SvgIconsProps): ReactElement => (
<svg className="progress-icon" width="75" height="89" viewBox="0 0 75 89" fill="{color}" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} d="M65.4179 88.4909C63.5947 88.4756 68.1868 84.75 69.2493 87.5972V9.25001C69.2456 6.07592 69.6741 6.75225 66.5 6.74926H12.1867C5.41412 6.74926 6.4374 5.75001 6.4374 12.4985L6.43741 76.75C6.43741 83.3329 5.41413 82.4993 12.1867 82.4993C12.1867 82.4993 68.1908 82.4927 69.2493 82.4927C70.3078 82.4927 73.5 82.4927 72 84.25C70.5 86.0073 70 87.5 68.1868 88.5L10.0822 88.5C2.91413 88.5 0.500039 86.5 0.500039 78.9178L0.500031 10.3322C0.500031 2.75001 2.4374 0.750012 10.0822 0.750012H65.4179C74 0.750012 75 2.75001 75 10.3322V78.9178C75 90.4928 66.5 88.25 65.4179 88.4909Z" />
    <path fill={color} d="M40.1019 33.0388V35.0777H46.1822H52.2898L45.3057 42.0097L38.3217 48.9417L34.5694 45.2175L30.7898 41.466L23.3949 48.8058L16 56.1456L17.4242 57.5592L18.8758 59L24.7643 53.1553L30.6529 47.3107L34.4325 51.035L38.1847 54.7864L46.6752 46.3592L55.1656 37.932V43.9942V50.0291H57.0828H59V40.5146V31H49.551H40.1019V33.0388Z" />
</svg>

);

export default MarkIconSvg;