import { useEffect, useState } from 'react';
import { getFraBrukerFraUrl } from '../../utils/url-utils';
import {OrNothing} from "../../utils/types/types";

export function useForrigeBruker() {
    const [forrigeBruker, setForrigeBruker]= useState<OrNothing<string>>(null);

    useEffect(() => {
        const forrigeBrukerFraUrl = getFraBrukerFraUrl();
        setForrigeBruker(forrigeBrukerFraUrl);
    },[forrigeBruker]);

    return forrigeBruker;
}
