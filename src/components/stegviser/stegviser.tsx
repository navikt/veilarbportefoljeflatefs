import * as React from 'react';
import cls from 'classnames';
import './stegviser.less';

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

function Stegviser (props: StegviserProps){
    const mapTilSteg = (antall: number, selectedIdx: number) => {
        const steg:any[] = [];

        for (let i = 0; i < antall; i++) {
            steg.push(<div
                key={i}
                className={cls("stegviser__steg", {'stegviser__steg--selected': i === selectedIdx})}
            />);
        }

        return steg;
    };

    return (
        <div className="stegviser">
            {mapTilSteg(props.antallSteg, props.valgtSteg)}
        </div>
    );
    

}

export default Stegviser;
