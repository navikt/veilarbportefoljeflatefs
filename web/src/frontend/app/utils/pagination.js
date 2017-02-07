import React, { PropTypes as PT } from 'react';

function Pagination({ fraIndex, antallTotalt, hentListe, tekst }) {
    const listeStorrelse = 20;

    const spaceStyle = {
        padding: '20px 5px'
    };

    return (
        <div>
            <h3 style={spaceStyle}>
                {tekst}
            </h3>
            <div>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        hentListe(0, listeStorrelse);
                    }}
                >{'<<'}</a>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = fraIndex - listeStorrelse < 0 ? fraIndex : fraIndex - listeStorrelse;
                        hentListe(fra, listeStorrelse);
                    }}
                >{'<'}</a>
                <span style={{ marginRight: '10px' }}>{((fraIndex / listeStorrelse) + 1)}</span>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = fraIndex + listeStorrelse >= antallTotalt ? fraIndex : fraIndex + listeStorrelse;
                        hentListe(fra, listeStorrelse);
                    }}
                >{'>'}</a>
                <a
                    href="" style={{ marginRight: '10px' }} onClick={(e) => {
                        e.preventDefault();
                        const fra = antallTotalt % listeStorrelse === 0 ? antallTotalt - listeStorrelse
                            : antallTotalt - (antallTotalt % listeStorrelse);
                        hentListe(fra, listeStorrelse);
                    }}
                >{'>>'}</a>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    antallTotalt: PT.number.isRequired,
    fraIndex: PT.number.isRequired,
    hentListe: PT.func.isRequired,
    tekst: PT.node.isRequired

};

export default Pagination;
