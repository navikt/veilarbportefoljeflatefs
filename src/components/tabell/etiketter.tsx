import {Tag} from '@navikt/ds-react';
import {BrukerModell, Profileringsresultat} from '../../typer/bruker-modell';
import {hentSkjermetInfo} from '../../utils/dato-utils';

interface EtiketterProps {
    bruker: BrukerModell;
}

export const Etiketter = ({bruker}: EtiketterProps) => {
    const skjermetInfo = hentSkjermetInfo(bruker.egenAnsatt, bruker.skjermetTil);

    return (
        <>
            {bruker.etiketter.erDoed && (
                <Tag variant="info" size="small" className="tabell-etikett etikett--doed">
                    Død
                </Tag>
            )}
            {bruker.etiketter.harSikkerhetstiltak && (
                <Tag variant="warning" size="small" className="tabell-etikett">
                    Sikkerhetstiltak
                </Tag>
            )}
            {bruker.etiketter.diskresjonskodeFortrolig && (
                <Tag variant="warning" size="small" className="tabell-etikett">
                    {`Kode ${bruker.etiketter.diskresjonskodeFortrolig}`}
                </Tag>
            )}
            {!skjermetInfo.hidden && (
                <Tag variant={skjermetInfo.type} size="small">
                    {`${skjermetInfo.tittel}`}
                </Tag>
            )}
            {bruker.etiketter.trengerOppfolgingsvedtak && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Trenger oppfølgingsvedtak § 14 a
                </Tag>
            )}
            {bruker.etiketter.trengerOppfolgingsvedtak &&
                bruker.etiketter.profileringResultat === Profileringsresultat.OPPGITT_HINDRINGER && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Oppgitt hindringer
                    </Tag>
                )}
            {bruker.etiketter.trengerOppfolgingsvedtak &&
                bruker.etiketter.profileringResultat === Profileringsresultat.ANTATT_GODE_MULIGHETER && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Antatt gode muligheter
                    </Tag>
                )}
            {bruker.etiketter.trengerOppfolgingsvedtak &&
                bruker.etiketter.profileringResultat === Profileringsresultat.ANTATT_BEHOV_FOR_VEILEDNING && (
                    <Tag variant="info" size="small" className="tabell-etikett">
                        Antatt behov for veiledning
                    </Tag>
                )}
            {bruker.etiketter.harBehovForArbeidsevneVurdering && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Behov for AEV
                </Tag>
            )}
            {bruker.etiketter.erSykmeldtMedArbeidsgiver && (
                <Tag variant="info" size="small" className="tabell-etikett">
                    Sykmeldt
                </Tag>
            )}
        </>
    );
};
