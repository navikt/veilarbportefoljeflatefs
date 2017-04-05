import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import createSimpleLink from '../components/simple-link';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse, antallReturnert }) {
    const fraIndeksForrigeSide = (fraIndex - sideStorrelse < 0) ? fraIndex : (fraIndex - sideStorrelse);
    const fraIndeksNesteSide = (antallTotalt % sideStorrelse === 0) ? (antallTotalt - sideStorrelse)
        : (antallTotalt - (antallTotalt % sideStorrelse));
    const fraIndeksSisteSide = (fraIndex + sideStorrelse >= antallTotalt) ? fraIndex : (fraIndex + sideStorrelse);

    const ikkeAktiv = classNames({ 'not-active': antallTotalt === antallReturnert });
    const seAlleKnapp = createSimpleLink(0, antallTotalt, 'Se alle', hentListe);
    const seFaerreKnapp = createSimpleLink(0, sideStorrelse, 'Se færre', hentListe);
    const seAlleKnappInactive = createSimpleLink(0, antallTotalt, 'Se alle', hentListe, 'not-active');

    function lagChevron(isLeft) {
        if (isLeft) {
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
        }
        return seAlleKnapp;
    }

    function visForrigeKnapp() {
        if (fraIndex === 0) {
            return (
                <button className="not-active" tabIndex="-1">
                    {lagChevron(true)}
                </button>
            );
        }
        return (createSimpleLink(fraIndeksForrigeSide, sideStorrelse, lagChevron(true), hentListe, 'prev'));
    }

    function visSideEnKnapp() {
        if (fraIndex !== 0) {
            return createSimpleLink(0, sideStorrelse, '1', hentListe, ikkeAktiv);
        }
        return null;
    }

    const visCurrentSideKnapp = <button><strong>{((fraIndex / sideStorrelse) + 1)}</strong></button>;

    function visSisteSideKnapp() {
        if (fraIndex < fraIndeksSisteSide && antallTotalt !== antallReturnert) {
            return createSimpleLink(
                fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt / sideStorrelse), hentListe, ikkeAktiv
            );
        }
        return null;
    }

    function visNesteKnapp() {
        if (fraIndex === fraIndeksSisteSide) {
            return (
                <button className="not-active" tabIndex="-1">
                    {lagChevron(false)}
                </button>
            );
        }
        return createSimpleLink(fraIndeksSisteSide, sideStorrelse, lagChevron(false), hentListe, ikkeAktiv);
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
                {visCurrentSideKnapp}
                {visSisteSideKnapp()}
                {visNesteKnapp()}
            </div>
        </div>
    );
}

Paginering.defaultProps = {
    tekst: '',
    antallReturnert: 0
};

Paginering.propTypes = {
    antallTotalt: PT.number.isRequired,
    fraIndex: PT.number.isRequired,
    hentListe: PT.func.isRequired,
    tekst: PT.node,
    sideStorrelse: PT.number.isRequired,
    antallReturnert: PT.number
};

export default Paginering;
