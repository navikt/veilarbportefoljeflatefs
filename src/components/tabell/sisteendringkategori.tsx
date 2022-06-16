import * as React from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.less';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getPersonUrl, setFraBrukerIUrl} from '../../utils/url-utils';
import {BodyShort, Link} from '@navikt/ds-react';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    if (!skalVises) {
        return null;
    }
    const sisteEndringKategori = !!bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';
    if (bruker.sisteEndringAktivitetId === undefined || bruker.sisteEndringAktivitetId === null) {
        return (
            <BodyShort size="small" className={className}>
                {sisteEndringKategori}
            </BodyShort>
        );
    }
    return (
        <div className={className}>
            <Link
                onClick={() => {
                    setFraBrukerIUrl(bruker.fnr);
                }}
                href={`${getPersonUrl(bruker.fnr, enhetId)}/aktivitet/vis/${bruker.sisteEndringAktivitetId}`}
                className={classnames('lenke lenke--frittstaende')}
            >
                <BodyShort size="small">{sisteEndringKategori}</BodyShort>
            </Link>
        </div>
    );
}

export default SisteEndringKategori;
