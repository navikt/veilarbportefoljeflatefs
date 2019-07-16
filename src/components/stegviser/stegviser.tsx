import * as React from 'react';
import cls from 'classnames';
import './stegviser.less';

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

class Stegviser extends React.Component<StegviserProps> {

    mapTilSteg = (antall: number, selectedIdx: number) => {
        const steg:any[] = [];

        for (let i = 0; i < antall; i++) {
            steg.push(<div
                key={i}
                className={cls("stegviser__steg", {'stegviser__steg--selected': i === selectedIdx})}
            />);
        }

        return steg;
    };

    render() {
        const { antallSteg, valgtSteg } = this.props;
        return (
            <div className="stegviser">
                {this.mapTilSteg(antallSteg, valgtSteg)}
            </div>
        );
    }

}

export default Stegviser;
