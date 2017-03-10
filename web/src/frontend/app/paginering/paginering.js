import React, { PropTypes as PT } from 'react';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse }) {
    function createLink(fraIndeks, tilIndeks, linkTekst) {
        return (<a href="" style={{marginRight: '2px'}} onClick={(e) => {
            e.preventDefault();
            hentListe(fraIndeks, tilIndeks);
        }}>{linkTekst}</a>)
    }

    const sisteFraIndex = fraIndex + sideStorrelse >= antallTotalt ? fraIndex : fraIndex + sideStorrelse;

    return (
        <div className="paginering">
            <h3 className="info">
                {tekst}
            </h3>
            <div className="bytt-side">
                {antallTotalt <= sideStorrelse ? null :
                    <div>
                        {createLink(0, antallTotalt, 'Se alle')}
                            <a href="" style={{margin: '0px 10px'}} className={fraIndex == 0 ? "not-active":""} onClick={(e) => {
                            e.preventDefault();
                            const fra = fraIndex - sideStorrelse < 0 ? fraIndex : fraIndex - sideStorrelse;
                            hentListe(fra, sideStorrelse);
                        }}
                        >{'<'}</a>
                        {createLink(0, sideStorrelse, '1')}
                        {fraIndex == 0 ? <span style={{marginRight: '2px'}}>...</span>:
                        <span style={{marginRight: '2px'}}>...<b>{((fraIndex / sideStorrelse) + 1)}</b>...</span>}
                        <a
                            href="" style={{ marginRight: '10px' }} onClick={(e) => {
                            e.preventDefault();
                            const fra = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
                                : antallTotalt - (antallTotalt % sideStorrelse);
                            hentListe(fra, sideStorrelse);
                        }}
                        >{ Math.ceil(antallTotalt/sideStorrelse)}</a>
                        {createLink(sisteFraIndex, sideStorrelse, '>')}
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
