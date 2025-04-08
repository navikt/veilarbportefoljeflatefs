import {useSelector} from 'react-redux';
import {BodyShort, Button, ErrorMessage} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {AppState} from '../../../reducer';
import './veiledergruppe-modal.css';

interface ValgtVeiledergruppeListeProps {
    valgteVeileder: string[];
    fjernValgtVeileder: (veilederId: string) => void;
    feil?: string;
}

export function ValgtVeiledergruppeListe({valgteVeileder, fjernValgtVeileder, feil}: ValgtVeiledergruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet => valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));

    const splitArrayITo = [
        veiledere.slice(0, Math.ceil(veiledere.length / 2)),
        veiledere.slice(Math.ceil(veiledere.length / 2), veiledere.length)
    ];

    return (
        <>
            <div
                className="veiledergruppe-modal__valgteveileder"
                data-testid="veiledergruppe_modal_valgte-veiledere_wrapper"
            >
                {veiledere.length === 0 ? (
                    <BodyShort size="small" className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                        Ingen veiledere lagt til i gruppen
                    </BodyShort>
                ) : (
                    splitArrayITo.map((listeMedVeileder, index) => (
                        <div key={index}>
                            {listeMedVeileder.map(veileder => (
                                <div key={veileder.ident} className="veiledergruppe-modal__valgteveileder__elem">
                                    <BodyShort size="small">{`${veileder.etternavn}, ${veileder.fornavn}`}</BodyShort>
                                    <Button
                                        size="small"
                                        variant="tertiary-neutral"
                                        type="button"
                                        onClick={() => fjernValgtVeileder(veileder.ident)}
                                        icon={
                                            <TrashIcon
                                                title={`Fjern "${veileder.etternavn}, ${veileder.fornavn}" fra gruppen`}
                                            />
                                        }
                                        data-testid="veiledergruppe_modal_valgt-veileder_fjern-knapp"
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            {feil && <ErrorMessage>{feil}</ErrorMessage>}
        </>
    );
}
