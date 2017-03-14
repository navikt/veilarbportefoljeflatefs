import React, { PropTypes as PT } from 'react';
import { Infotittel } from "nav-frontend-typografi";

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse }) {
    function createSimpleLink(fraIndeks, tilIndeks, linkTekst) {
        return (<Infotittel><a href="" onClick={(e) => {
            e.preventDefault();
            hentListe(fraIndeks, tilIndeks);
        }}>{linkTekst}</a></Infotittel>)
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
                        <Infotittel><a href="" className="not-active" onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksForrigeSide, sideStorrelse);
                        }}
                        >{'<'}</a></Infotittel>:
                        createSimpleLink(fraIndeksForrigeSide, sideStorrelse, '<')
                    }
                    {fraIndex == 0 ?
                        <Infotittel><a href="" className="bold" onClick={(e) => {
                            e.preventDefault();
                            hentListe(0, sideStorrelse);
                        }}>{'1'}</a></Infotittel>:
                        createSimpleLink(0, sideStorrelse, '1')
                    }
                    {fraIndex == 0 ? null :
                    <Infotittel ><b>{((fraIndex / sideStorrelse) + 1)}</b></Infotittel>}
                    {createSimpleLink(fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt/sideStorrelse))}
                    {createSimpleLink(fraIndeksSisteSide, sideStorrelse, '>')}
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
