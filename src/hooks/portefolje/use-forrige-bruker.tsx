import {useEffect, useState} from 'react';
import {OrNothing} from '../../utils/types/types';
import {hentBrukerIKontekst} from '../../middleware/api';

export function useForrigeBruker() {
    const [forrigeBruker, setForrigeBruker] = useState<OrNothing<string>>(null);

    useEffect(() => {
        hentBrukerIKontekst().then(setForrigeBruker);
    }, []);

    return forrigeBruker;
}
