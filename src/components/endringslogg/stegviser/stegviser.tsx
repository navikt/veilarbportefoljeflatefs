import * as React from 'react';
import classNames from 'classnames';
import './stegviser.css';

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

const Stegviser = ({antallSteg, valgtSteg}: StegviserProps) => {
    const mapTilSteg = (antall: number, selectedIdx: number) => {
        return new Array(antall).fill(0).map((_, i) => (
            <div
                key={i}
                className={classNames('stegviser__steg', {
                    'stegviser__steg--selected': i === selectedIdx
                })}
            />
        ));
    };

    return (
        <div className={'stegviser'} data-testid="endringslogg_stegviser">
            {mapTilSteg(antallSteg, valgtSteg)}
        </div>
    );
};

export default Stegviser;
