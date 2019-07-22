import * as React from 'react';
import cls from 'classnames';
import './stegviser.less';

;

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

function Stegviser(props: StegviserProps) {
    const mapTilSteg = (antall: number, selectedIdx: number) => {
        return new Array(props.antallSteg)
            .fill(0)
            .map((_, i) => (
                <div key={i} className={cls('stegviser__steg', {'stegviser__steg--selected': i == props.valgtSteg})}/>
            ));
    };

    return (
        <div className="stegviser">
            {mapTilSteg(props.antallSteg, props.valgtSteg)}
        </div>
    );
}

export default Stegviser;
