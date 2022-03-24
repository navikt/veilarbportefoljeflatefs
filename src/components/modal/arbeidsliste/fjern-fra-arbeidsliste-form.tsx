import * as React from 'react';
import {connect} from 'react-redux';
import {slettArbeidsliste} from '../../../ducks/arbeidsliste';
import {oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {hentStatusTall, leggTilStatustall} from '../../../ducks/statustall';
import {FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal} from '../../../ducks/modal-feilmelding-brukere';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {ArbeidslisteDataModell, BrukerModell} from '../../../model-interfaces';
import './arbeidsliste.less';
import {logEvent} from '../../../utils/frontend-logger';
import {Button, Label} from '@navikt/ds-react';

function brukerLabel(bruker) {
    return (
        <li key={bruker.fnr}>
            <Label size="small">{`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}</Label>
        </li>
    );
}

interface FjernFraArbeidslisteFormProps {
    lukkModal: () => void;
    valgteBrukere: BrukerModell[];
    onSubmit: (valgteBrukere: BrukerModell[], props, valgtEnhet, innloggetVeileder) => void;
    visBrukerLabel?: boolean;
    valgtEnhet: string;
    innloggetVeileder: string;
}

function FjernFraArbeidslisteForm({
    lukkModal,
    valgteBrukere,
    onSubmit,
    visBrukerLabel,
    valgtEnhet,
    innloggetVeileder
}: FjernFraArbeidslisteFormProps) {
    const className = valgteBrukere.length >= 22 ? 'arbeidsliste-listetekst__lang' : 'arbeidsliste-listetekst';

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                logEvent('portefolje.metrikker.fjern_arbeidsliste');
                onSubmit(valgteBrukere, lukkModal, valgtEnhet, innloggetVeileder);
            }}
        >
            <div className={className}>
                {visBrukerLabel && <ul>{valgteBrukere.map(bruker => brukerLabel(bruker))}</ul>}
            </div>
            <div className="knapper">
                <Button
                    className="knapp knapp--hoved"
                    type="submit"
                    data-testid="modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp"
                >
                    Bekreft
                </Button>
                <Button variant="secondary" className="knapp" onClick={lukkModal}>
                    Avbryt
                </Button>
            </div>
        </form>
    );
}

function oppdaterState(res, lukkModal: () => void, arbeidsliste: ArbeidslisteDataModell[], dispatch) {
    lukkModal();

    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = arbeidsliste
        .map(a => ({
            ...a,
            arbeidslisteAktiv: false
        }))
        .filter(bruker => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: FJERN_FRA_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }
    leggTilStatustall('minArbeidsliste', -brukereOK.length)(dispatch);
    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapStateToProps = state => ({
    slettFraArbeidslisteStatus: state.arbeidsliste.status,
    valgtEnhet: state.valgtEnhet.data.enhetId,
    innloggetVeileder: state.innloggetVeileder.data.ident
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (valgteBrukere, lukkModal, valgtEnhet, innloggetVeileder) => {
        const arbeidsliste: ArbeidslisteDataModell[] = valgteBrukere.map(bruker => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist,
            kategori: bruker.arbeidsliste.kategori
        }));
        slettArbeidsliste(arbeidsliste)(dispatch)
            .then(res => oppdaterState(res, lukkModal, arbeidsliste, dispatch))
            .then(() => hentStatusTall(valgtEnhet, innloggetVeileder)(dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FjernFraArbeidslisteForm);
