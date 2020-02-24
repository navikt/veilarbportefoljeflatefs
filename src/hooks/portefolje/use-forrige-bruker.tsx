import { useEffect, useState } from 'react';
import { getFraBrukerFraUrl } from '../../utils/url-utils';

export function useForrigeBruker() {
    const [forrigeBruker, setForrigeBruker]= useState<string | undefined>(undefined);

    useEffect(() => {
        const forrigeBrukerFraUrl = getFraBrukerFraUrl();
        setForrigeBruker(forrigeBrukerFraUrl);
    },[forrigeBruker]);

    return forrigeBruker;
}
