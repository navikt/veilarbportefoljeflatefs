import classNames from 'classnames';
import './stegviser.css';

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

export const Stegviser = ({antallSteg, valgtSteg}: StegviserProps) => {
    const mapTilSteg = (antall: number, selectedIdx: number) => {
        return Array.from(Array(antall).keys()).map(stegnummer => (
            <div
                key={stegnummer}
                className={classNames('stegviser__steg', {
                    'stegviser__steg--selected': stegnummer === selectedIdx
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
