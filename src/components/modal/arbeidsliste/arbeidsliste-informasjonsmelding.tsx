import * as React from 'react';
import {Alert, Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {trackAmplitude} from '../../../amplitude/amplitude';

const ArbeidslisteInformasjonsmelding = () => (
    <Alert variant="info" className="arbeidsliste-alert" size="small">
        Arbeidslisten er ikke synlig for personen det gjelder. Derfor skal du ikke skrive sensitive opplysninger eller
        annen informasjon som personen skal ha innsyn i her. Bruk arbeidslisten som huskelapp for deg selv. Innholdet
        vil kunne utleveres ved innsynsbegjæring.
        <br />
        <b>
            <Link
                href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                target="_blank"
                onClick={() => {
                    trackAmplitude({
                        name: 'navigere',
                        data: {lenketekst: 'Les mer om hvordan bruke arbeidslisten på Navet', destinasjon: 'navet'}
                    });
                }}
            >
                Les mer om hvordan bruke arbeidslisten på Navet
                <ExternalLinkIcon title="Ekstern lenke" fontSize="1.2em" />
            </Link>
        </b>
    </Alert>
);

export default ArbeidslisteInformasjonsmelding;
