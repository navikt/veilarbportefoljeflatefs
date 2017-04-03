import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { Element } from 'nav-frontend-typografi';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse, antallReturnert }) {
    function createSimpleLink(fraIndeks, tilIndeks, linkTekst, className) {
        return (
            <button
                className={className}
                onClick={(e) => {
                    e.preventDefault();
                    hentListe(fraIndeks, tilIndeks);
                }}
            >{linkTekst}</button>);
    }

    const fraIndeksForrigeSide = fraIndex - sideStorrelse < 0 ? fraIndex : fraIndex - sideStorrelse;
    const fraIndeksNesteSide = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
        : antallTotalt - (antallTotalt % sideStorrelse);
    const fraIndeksSisteSide = fraIndex + sideStorrelse >= antallTotalt ? fraIndex : fraIndex + sideStorrelse;

    const ikkeAktiv = classNames({'not-active': antallTotalt === antallReturnert});
    return (
        <div className="paginering">
            <Element className="info" tag="h1">
                <strong>
                    {tekst}
                </strong>
            </Element>
            {antallTotalt <= sideStorrelse ? null :
            <div className="bytt-side">
                {createSimpleLink(0, antallTotalt, 'Se alle')}
                {fraIndex === 0 ?
                    <button className="not-active" tabIndex="-1">
                        <i className="chevron--venstre">
                            <span className="text-hide prev ">{'Forrige'}</span>
                        </i>
                    </button> :
                    <button
                        className="prev"
                        onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksForrigeSide, sideStorrelse);
                        }}
                    >
                        <i className="chevron--venstre">
                            <span className="text-hide prev">{'Forrige'}</span>
                        </i>
                    </button>
                    }
                {fraIndex === 0 ? null :
                        createSimpleLink(0, sideStorrelse, '1', ikkeAktiv)
                    }
                <button><strong>{((fraIndex / sideStorrelse) + 1)}</strong></button>
                {
                    antallTotalt === antallReturnert ? null :
                        (fraIndex === fraIndeksSisteSide ? null :
                        createSimpleLink(
                            fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt / sideStorrelse), ikkeAktiv
                        ))
                }
                {fraIndex === fraIndeksSisteSide ?
                    <button className="not-active" tabIndex="-1">
                        <i className="chevron--hoyre">
                            <span className="text-hide next">{'Neste'}</span>
                        </i>
                    </button> :
                    <button
                        className={ikkeAktiv}
                        onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksSisteSide, sideStorrelse);
                        }}
                    ><i className="chevron--hoyre"><span className="text-hide next">{'Neste'}</span></i></button>
                    }
            </div>
            }
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
