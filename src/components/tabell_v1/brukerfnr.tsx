import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';

interface BrukerFnrProps {
    role?: string;
    className?: string;
    bruker: BrukerModell;
}

export default ({role, className, bruker}: BrukerFnrProps) => <div role={role} className={className}>{bruker.fnr}</div>;
