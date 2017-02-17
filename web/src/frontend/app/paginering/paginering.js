import React, { PropTypes as PT } from 'react';

function Paginering({ fraIndex, antallTotalt, hentListe, tekst, sideStorrelse }) {
    return (
        <div className="paginering">
            <h3 className="info">
                {tekst}
            </h3>
            <div className="bytt-side">
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        hentListe(0, sideStorrelse);
                    }}
                >{'<<'}</a>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = fraIndex - sideStorrelse < 0 ? fraIndex : fraIndex - sideStorrelse;
                        hentListe(fra, sideStorrelse);
                    }}
                >{'<'}</a>
                <span style={{ marginRight: '10px' }}>{((fraIndex / sideStorrelse) + 1)}</span>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = fraIndex + sideStorrelse >= antallTotalt ? fraIndex : fraIndex + sideStorrelse;
                        hentListe(fra, sideStorrelse);
                    }}
                >{'>'}</a>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = antallTotalt % sideStorrelse === 0 ? antallTotalt - sideStorrelse
                            : antallTotalt - (antallTotalt % sideStorrelse);
                        hentListe(fra, sideStorrelse);
                    }}
                >{'>>'}</a>
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
