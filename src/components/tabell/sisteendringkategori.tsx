import * as React from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.less';
import {OrNothing} from '../../utils/types/types';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {setFraBrukerIUrl} from '../../utils/url-utils';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    if (!skalVises) {
        return null;
    }
    const sisteEndringKategori = !!bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';
    if (bruker.sisteEndringAktivitetId === undefined || bruker.sisteEndringAktivitetId === null) {
        return <span className={className}>{sisteEndringKategori}</span>;
    }
    return (
        <div className={className}>
            <a
                onClick={() => {
                    setFraBrukerIUrl(bruker.fnr);
                }}
                href={`${window.location.origin}/veilarbpersonflatefs/${bruker.fnr}/aktivitet/vis/${bruker.sisteEndringAktivitetId}?enhet=${enhetId}`}
                className={classnames('lenke lenke--frittstaende')}
            >
                {sisteEndringKategori}
            </a>
        </div>
    );
}

export default SisteEndringKategori;
