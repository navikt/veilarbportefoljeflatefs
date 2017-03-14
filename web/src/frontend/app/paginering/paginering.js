import React, { PropTypes as PT } from 'react';
import { Infotekst } from "nav-frontend-typografi";

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse }) {
    function createSimpleLink(fraIndeks, tilIndeks, linkTekst) {
        return (<Infotekst><a href="" onClick={(e) => {
            e.preventDefault();
            hentListe(fraIndeks, tilIndeks);
        }}>{linkTekst}</a></Infotekst>)
    }

    const fraIndeksForrigeSide = fraIndex - sideStorrelse < 0 ? fraIndex : fraIndex - sideStorrelse;
    const fraIndeksNesteSide = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
        : antallTotalt - (antallTotalt % sideStorrelse);
    const fraIndeksSisteSide = fraIndex + sideStorrelse >= antallTotalt ? fraIndex : fraIndex + sideStorrelse;


    return (
        <div className="paginering">
            <h3 className="info">
                {tekst}
            </h3>
            {antallTotalt <= sideStorrelse ? null :
                <div className="bytt-side">
                    {createSimpleLink(0, antallTotalt, 'Se alle')}
                    {fraIndex == 0 ?
                        <Infotekst><a href="" className="not-active" onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksForrigeSide, sideStorrelse);
                        }}
                        >{'<'}</a></Infotekst>:
                        createSimpleLink(fraIndeksForrigeSide, sideStorrelse, '<')
                    }
                    {fraIndex == 0 ? null :
                        createSimpleLink(0, sideStorrelse, '1')
                    }
                    <Infotekst ><b>{((fraIndex / sideStorrelse) + 1)}</b></Infotekst>
                    {fraIndex == fraIndeksSisteSide ? null :
                        createSimpleLink(fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt/sideStorrelse))
                    }
                    {fraIndex == fraIndeksSisteSide ?
                        <Infotekst><a href="" className="not-active" onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksSisteSide, sideStorrelse);
                        }}
                        >{'>'}</a></Infotekst>:
                        createSimpleLink(fraIndeksSisteSide, sideStorrelse, '>')
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
    tekst: PT.node.isRequired,
    sideStorrelse: PT.number.isRequired
};

export default Paginering;
