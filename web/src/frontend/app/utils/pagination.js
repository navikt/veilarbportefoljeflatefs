import React, {PropTypes as PT} from 'react';

function Pagination({fraIndex, antallTotalt, antallReturnert, hentPortefolje}) {
    const spaceStyle = {
        padding: '20px 5px'
    };

    return (
        <div>
            <h3 style={spaceStyle}>
                {`Viser fra ${fraIndex} til ${fraIndex + antallReturnert} av totalt ${antallTotalt} brukere`}
            </h3>
            <div>
                <a href="" style={{marginRight: '10px'}} onClick={ (e) => {
                    e.preventDefault();
                    hentPortefolje(0, 20)
                } }
                >{"<<"}</a>
                <a href="" style={{marginRight: '10px'}} onClick={(e) => {
                    e.preventDefault();
                    let fra = fraIndex - 20 <= 0 ? fraIndex : fraIndex - 20;
                    hentPortefolje(fra, 20)
                }}
                >{"<"}</a>
                <span style={{marginRight: '10px'}}>{(fraIndex / 20 + 1)}</span>
                <a href="" style={{marginRight: '10px'}} onClick={ (e) => {
                    e.preventDefault();
                    let fra = fraIndex + 20 >= antallTotalt ? fraIndex : fraIndex + 20;
                    hentPortefolje(fra, 20)
                }}>{">"}</a>
                <a href="" style={{marginRight: '10px'}} onClick={ (e) => {
                    e.preventDefault();
                    let fra = antallTotalt % 20 == 0 ? antallTotalt - 20 : antallTotalt - (antallTotalt % 20);
                    hentPortefolje(fra, 20)
                }}>{">>"}</a>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    enhetId: PT.string,
    ident: PT.string,
    antallTotalt: PT.number,
    fraIndex: PT.number,
    hentPortefolje: PT.func

};

export default Pagination;
