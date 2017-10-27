import * as React from 'react';
import {BrukerModell} from "../../model-interfaces";

interface BrukerFnrProps {
    bruker: BrukerModell
}

export default ({ bruker }: BrukerFnrProps) => <span className="col col-xs-2">{bruker.fnr}</span>
