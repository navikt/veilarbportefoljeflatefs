import React, { PropTypes as PT } from 'react';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse }) {
    function createSimpleLink(fraIndeks, tilIndeks, linkTekst) {
        return (<a href="" style={{marginRight: '2px'}} onClick={(e) => {
            e.preventDefault();
            hentListe(fraIndeks, tilIndeks);
        }}>{linkTekst}</a>)
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
            <div className="bytt-side">
                {antallTotalt <= sideStorrelse ? null :
                    <div>
                        {createSimpleLink(0, antallTotalt, 'Se alle')}
                        <a href="" style={{margin: '0px 10px'}} className={fraIndex == 0 ? "not-active":""} onClick={(e) => {
                            e.preventDefault();
                            hentListe(fraIndeksForrigeSide, sideStorrelse);
                        }}
                        >{'<'}</a>
                        {createSimpleLink(0, sideStorrelse, '1')}
                        {fraIndex == 0 ? <span style={{marginRight: '2px'}}>...</span>:
                        <span style={{marginRight: '2px'}}>...<b>{((fraIndex / sideStorrelse) + 1)}</b>...</span>}
                        {createSimpleLink(fraIndeksNesteSide, sideStorrelse, Math.ceil(antallTotalt/sideStorrelse))}
                        {createSimpleLink(fraIndeksSisteSide, sideStorrelse, '>')}
                        <a
                            href="" style={{ marginRight: '10px' }} onClick={(e) => {
                            e.preventDefault();
                            let fra = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
                                : antallTotalt - (antallTotalt % sideStorrelse);
                            if (fra < 0) fra = 0;
                            hentListe(fra, sideStorrelse);
                        }}
                        >{'>>'}</a>
                        </div>
                }
            </div>
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
