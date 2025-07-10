import {Tag} from '@navikt/ds-react';
import {BrukerModell, Profileringsresultat, VurderingsBehov} from '../../typer/bruker-modell';
import {hentSkjermetInfo} from '../../utils/dato-utils';

interface EtiketterProps {
    bruker: BrukerModell;
}

export const Etiketter = ({bruker}: EtiketterProps) => {
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
            {bruker.trengerOppfolgingsvedtak && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Trenger oppfølgingsvedtak § 14 a
                </Tag>
            )}
            {bruker.trengerOppfolgingsvedtak &&
                bruker.profileringResultat === Profileringsresultat.OPPGITT_HINDRINGER && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Oppgitt hindringer
                    </Tag>
                )}
            {bruker.trengerOppfolgingsvedtak &&
                bruker.profileringResultat === Profileringsresultat.ANTATT_GODE_MULIGHETER && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Antatt gode muligheter
                    </Tag>
                )}
            {bruker.trengerOppfolgingsvedtak &&
                bruker.profileringResultat === Profileringsresultat.ANTATT_BEHOV_FOR_VEILEDNING && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Antatt behov for veiledning
                    </Tag>
                )}
            {bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Behov for AEV
                </Tag>
            )}
            {bruker.erSykmeldtMedArbeidsgiver && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Sykmeldt
                </Tag>
            )}
        </>
    );
};
