import * as React from 'react';
import {BrukerModell} from "../../model-interfaces";

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell
}

export default ({ className, bruker }: BrukerFnrProps) => <span className={className}>{bruker.fnr}</span>
