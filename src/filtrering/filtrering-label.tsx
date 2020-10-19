import React, {MouseEvent, useState} from 'react';
import {lagConfig} from './filter-konstanter';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import classNames from 'classnames';
import './filtrering-label.less';
import './filtrering-skjema.less';
import {VarselModal, VarselModalType} from '../components/modal/varselmodal/varselmodal';
import {Undertittel, Normaltekst} from 'nav-frontend-typografi';

interface FiltreringLabelProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
    skalHaKryssIkon?: boolean;
}

function FiltreringLabel({
    label,
    slettFilter,
    harMuligMenIkkeValgtKolonne = false,
    markert = false,
    skalHaKryssIkon = true
}: FiltreringLabelProps) {
    const className = classNames('filtreringlabel__label', {'filtreringlabel-slett-filter': !skalHaKryssIkon});
    const arialLabel = skalHaKryssIkon ? 'Slett filter' : ' Slett alle filtervalg';
    const slettAlleFiltervalg = arialLabel === ' Slett alle filtervalg';
    const buttonClassnames = classNames(
        'filtreringlabel',
        'typo-undertekst',
        {'filtreringlabel--markert': markert},
        {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne},
        {'slett-alle-filtervalg-knapp': slettAlleFiltervalg}
    );
    const [feilemeldingOpen, setFeilemeldingOpen] = useState(true);

    if (label === undefined) {
        return (
            <VarselModal
                contentLabel={'Feil med filter'}
                isOpen={feilemeldingOpen}
                type={VarselModalType.FEIL}
                closeButton={false}
                onRequestClose={() => setFeilemeldingOpen(false)}
            >
                <div className="server-feil-modal">
                    <Undertittel tag="h1" className="blokk-xxs">
                        Det er en teknisk feil ved et eller flere filter.
                    </Undertittel>
                    <Normaltekst className="blokk-s">Prøv igjen senere.</Normaltekst>
                    <button className="knapp knapp--hoved blokk-s" onClick={() => setFeilemeldingOpen(false)}>
                        Ok
                    </button>
                </div>
            </VarselModal>
        );
    }
    return (
        <button
            title={lagConfig(label).label}
            aria-label={arialLabel}
            className={buttonClassnames}
            onClick={slettFilter}
        >
            <span className={className}>{lagConfig(label).label}</span>
            {skalHaKryssIkon && <FilterIkon />}
        </button>
    );
}

export default FiltreringLabel;
