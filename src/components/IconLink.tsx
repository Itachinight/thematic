import React, {FC} from "react";
import {IconLinkProps} from "../interfaces";

const IconLink:FC<IconLinkProps> = (props: IconLinkProps) => (
    <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.link}
    >
        <span className={props.iconClass}/>
    </a>
);

export default IconLink;