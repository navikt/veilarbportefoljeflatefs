import {Tag} from '@navikt/ds-react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import {hentSkjermetInfo} from '../../utils/dato-utils';

interface EtiketterProps {
    bruker: BrukerModell;
}

function Etiketter({bruker}: EtiketterProps) {
    const skjermetInfo = hentSkjermetInfo(bruker.egenAnsatt, bruker.skjermetTil);

    return (
        <>
            {bruker.erDoed && (
                <Tag variant="info" size="small" className="tabell-etikett etikett--doed">
                    Død
                </Tag>
            )}
            {bruker.sikkerhetstiltak && bruker.sikkerhetstiltak.length !== 0 && (
                <Tag variant="warning" size="small" className="tabell-etikett">
                    Sikkerhetstiltak
                </Tag>
            )}
            {bruker.diskresjonskode && (
                <Tag variant="warning" size="small" className="tabell-etikett">
                    {`Kode ${bruker.diskresjonskode}`}
                </Tag>
            )}
            {!skjermetInfo.hidden && (
                <Tag variant={skjermetInfo.type} size="small">
                    {`${skjermetInfo.tittel}`}
                </Tag>
            )}
            {bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Trenger vurdering
                </Tag>
            )}
            {bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Behov for AEV
                </Tag>
            )}
            {bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.OPPGITT_HINDRINGER && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Oppgitt hindringer
                </Tag>
            )}
            {bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.ANTATT_GODE_MULIGHETER && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Antatt gode muligheter
                </Tag>
            )}
            {bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.ANTATT_BEHOV_FOR_VEILEDNING && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Antatt behov for veiledning
                </Tag>
            )}
            {bruker.erSykmeldtMedArbeidsgiver && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Sykmeldt
                </Tag>
            )}
        </>
    );
}

export default Etiketter;
