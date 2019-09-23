import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';

interface BrukerOppfolgingStartetProps {
    className?: string;
    bruker: BrukerModell;
}

export default ({ className, bruker }: BrukerOppfolgingStartetProps) => <span className={className}>{bruker.oppfolgingStartDato}</span>;
