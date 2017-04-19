import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import ButtonRadiogroup from './buttonradiogroup';

function KnappPanel({ children, disabled, pressed, ...props }) {
    const classes = classNames('paginering__knapp', {
        disabled,
        'paginering__knapp--pressed': pressed
    });
    return (
        <button
            className={classes}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

KnappPanel.propTypes = {
    children: PT.node.isRequired,
    disabled: PT.bool,
    pressed: PT.bool
};
KnappPanel.defaultProps = {
    disabled: false,
    pressed: false
};

function Chevron({ retning, children }) {
    return (
        <i className={`chevron--${retning}`}>
            <span className="text-hide prev">{children}</span>
        </i>
    );
}

Chevron.propTypes = {
    children: PT.node.isRequired,
    retning: PT.string.isRequired
};

function ToggleModusKnapp({ hentListe, sideStorrelse, viserAlle, antallReturnert, antallTotalt }) {
    const skalVareInaktiv = (viserAlle && antallReturnert <= sideStorrelse);

    if (skalVareInaktiv) {
        return (
            <KnappPanel disabled>
                Se alle
            </KnappPanel>
        );
    }

    if (viserAlle) {
        return (
            <KnappPanel pressed onClick={() => hentListe(0, sideStorrelse)}>
                Se alle
            </KnappPanel>
        );
    }

    return (
        <KnappPanel onClick={() => hentListe(0, antallTotalt)}>
            Se alle
        </KnappPanel>
    );
}

ToggleModusKnapp.propTypes = {
    hentListe: PT.func.isRequired,
    sideStorrelse: PT.number.isRequired,
    viserAlle: PT.bool.isRequired,
    antallReturnert: PT.number.isRequired,
    antallTotalt: PT.number.isRequired
};


function gaTilSideFactory(sideStorrelse, hentListe) {
    return (side) => () => hentListe((side - 1) * sideStorrelse, sideStorrelse);
}

function Paginering(props) {
    const {
        fraIndex,
        antallTotalt,
        hentListe,
        tekst,
        antallReturnert,
        sideStorrelse: antattSideStorrelse,
        visButtongroup,
        visDiagram
    } = props;

    // Fordi sideStorrelse tydeligvis ikke endrer seg i staten, selvom den helt klart egentlig gjør det i UI.
    let sideStorrelse = antattSideStorrelse;
    if (antattSideStorrelse < antallReturnert) {
        sideStorrelse = antallReturnert;
    }

    const navarendeSide = Math.round(fraIndex / sideStorrelse) + 1;
    const antallSider = Math.max(Math.ceil(antallTotalt / sideStorrelse), 1);
    const erPaForsteSide = navarendeSide === 1;
    const erPaSisteSide = navarendeSide === antallSider;
    const gaTilSide = gaTilSideFactory(sideStorrelse, hentListe);

    return (
        <div className="paginering row blokk-s">
            <div className="col-sm-4">
                <Element tag="h1">
                    <strong>
                        {tekst}
                    </strong>
                </Element>
            </div>
            <div className="col-sm-3">
                { visButtongroup && <ButtonRadiogroup /> }
            </div>
            <div className="col-sm-5">
                { !visDiagram && <div className="paginering__knapper">
                    <ToggleModusKnapp
                        viserAlle={antallSider === 1}
                        sideStorrelse={antattSideStorrelse}
                        hentListe={hentListe}
                        antallReturnert={antallReturnert}
                        antallTotalt={antallTotalt}
                    />
                    <KnappPanel disabled={erPaForsteSide} onClick={gaTilSide(navarendeSide - 1)}>
                        <Chevron retning="venstre">Forrige</Chevron>
                    </KnappPanel>

                    {!erPaForsteSide && <KnappPanel onClick={gaTilSide(1)}>1</KnappPanel>}

                    <KnappPanel>
                        <strong>{navarendeSide}</strong>
                    </KnappPanel>

                    {!erPaSisteSide && <KnappPanel onClick={gaTilSide(antallSider)}>{antallSider}</KnappPanel>}

                    <KnappPanel disabled={erPaSisteSide} onClick={gaTilSide(navarendeSide + 1)}>
                        <Chevron retning="hoyre">Neste</Chevron>
                    </KnappPanel>
                </div> }
            </div>
        </div>
    );
}

Paginering.propTypes = {
    antallTotalt: PT.number.isRequired,
    fraIndex: PT.number.isRequired,
    hentListe: PT.func.isRequired,
    tekst: PT.node.isRequired,
    sideStorrelse: PT.number.isRequired,
    visButtongroup: PT.bool,
    antallReturnert: PT.number.isRequired,
    visDiagram: PT.bool
};
Paginering.defaultProps = {
    visDiagram: false
};

Paginering.defaultProps = {
    visButtongroup: false
};

export default Paginering;
