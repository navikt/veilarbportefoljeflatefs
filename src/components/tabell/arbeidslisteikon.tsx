import * as React from 'react';
import '../../minoversikt/minoversikt.css';
import ArbeidslisteikonBla from '../ikoner/arbeidsliste/arbeidslisteikon_bla.svg?react';
import ArbeidslisteikonGronn from '../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg?react';
import ArbeidslisteikonLilla from '../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg?react';
import ArbeidslisteikonGul from '../ikoner/arbeidsliste/arbeidslisteikon_gul.svg?react';

import {KategoriModell} from '../../model-interfaces';

interface ArbeidslistekategoriProps {
    kategori: KategoriModell;
    dataTestid?: string;
}

export default function ArbeidslistekategoriVisning({kategori, dataTestid}: ArbeidslistekategoriProps) {
    const velgArbeidslistekategori = () => {
        switch (kategori) {
            case KategoriModell.BLA:
                return <ArbeidslisteikonBla data-testid={dataTestid} />;
            case KategoriModell.LILLA:
                return <ArbeidslisteikonLilla data-testid={dataTestid} />;
            case KategoriModell.GRONN:
                return <ArbeidslisteikonGronn data-testid={dataTestid} />;
            case KategoriModell.GUL:
                return <ArbeidslisteikonGul data-testid={dataTestid} />;
            default:
                return <div className="tomt-arbeidslisteikon" />;
        }
    };

    return (
        <span className="arbeidsliste--ikon" data-testid="brukerliste_span_arbeidslisteikon">
            {velgArbeidslistekategori()}
        </span>
    );
}
