import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { Element } from 'nav-frontend-typografi';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse, antallReturnert }) {
    function createSimpleLink(fraIndeks, tilIndeks, child, className) {
        return (
            <button
                className={className}
                onClick={(e) => {
                    e.preventDefault();
                    hentListe(fraIndeks, tilIndeks);
                }}
            >
                {child}
            </button>);
    }

    const fraIndeksForrigeSide = fraIndex - sideStorrelse < 0 ? fraIndex : fraIndex - sideStorrelse;
    const fraIndeksNesteSide = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
        : antallTotalt - (antallTotalt % sideStorrelse);
    const fraIndeksSisteSide = fraIndex + sideStorrelse >= antallTotalt ? fraIndex : fraIndex + sideStorrelse;

    const ikkeAktiv = classNames({'not-active': antallTotalt === antallReturnert});
    const seAlleKnapp = createSimpleLink(0, antallTotalt, 'Se alle');
    const seFaerreKnapp = createSimpleLink(0, sideStorrelse, 'Se færre');
    const seAlleKnappInactive = createSimpleLink(0, antallTotalt, 'Se alle', 'not-active');

    function lagChevron(isLeft) {
        if(isLeft) {
            return (
                <i className="chevron--venstre">
                    <span className="text-hide prev">{'Forrige'}</span>
                </i>
            );
        }
        return (
            <i className="chevron--hoyre">
                <span className="text-hide next">{'Neste'}</span>
            </i>
        );
    }

    function visSeAlleKnapp() {
        if (antallReturnert === antallTotalt && antallReturnert <= sideStorrelse) {
            return seAlleKnappInactive;
        } else if (antallReturnert === antallTotalt) {
            return seFaerreKnapp;
        } else {
            return seAlleKnapp;
        }
    }

    function visForrigeKnapp() {
        if (fraIndex === 0) {
            return (
                <button className="not-active" tabIndex="-1">
                    {lagChevron(true)}
                </button>
            );
        }
        return(createSimpleLink(fraIndeksForrigeSide, sideStorrelse, lagChevron(true), 'prev'));
    }

    function visSideEnKnapp() {
        if (fraIndex !== 0) {
            return createSimpleLink(0, sideStorrelse, '1', ikkeAktiv);
        }
    }

    const visCurrentKnapp = <button><strong>{((fraIndex / sideStorrelse) + 1)}</strong></button>;

    function visSisteSideKnapp() {
        if (antallTotalt === antallReturnert) {
            return null;
        } else if (fraIndex < fraIndeksSisteSide) {
            return createSimpleLink(
                fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt / sideStorrelse), ikkeAktiv
            );
        }
    }

    function visNesteKnapp() {
        if (fraIndex === fraIndeksSisteSide) {
            return (
                <button className="not-active" tabIndex="-1">
                    {lagChevron(false)}
                </button>
            );
        }
        return createSimpleLink(fraIndeksSisteSide, sideStorrelse, lagChevron(false), ikkeAktiv);
    }

    return (
        <div className="paginering">
            <Element className="info" tag="h1">
                <strong>
                    {tekst}
                </strong>
            </Element>
            <div className="bytt-side">
                {visSeAlleKnapp()}
                {visForrigeKnapp()}
                {visSideEnKnapp()}
                {visCurrentKnapp}
                {visSisteSideKnapp()}
                {visNesteKnapp()}
            </div>
        </div>
    );
}

Paginering.propTypes = {
    antallTotalt: PT.number.isRequired,
    fraIndex: PT.number.isRequired,
    hentListe: PT.func.isRequired,
    tekst: PT.node,
    sideStorrelse: PT.number.isRequired,
    antallReturnert: PT.number.isRequired
};

export default Paginering;
