import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';

interface BrukerFnrProps {
    role?: string;
    labelledBy?: string;
    className?: string;
    bruker: BrukerModell;
}

export default ({role, labelledBy, className, bruker}: BrukerFnrProps) => (
    <div role={role} aria-labelledby={labelledBy} className={className}>
        {bruker.fnr}
    </div>
);
