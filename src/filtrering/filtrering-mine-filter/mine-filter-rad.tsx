import {useDispatch} from 'react-redux';
import {Radio} from '@navikt/ds-react';
import {apneMineFilterModal} from '../../ducks/lagret-filter-ui-state';
import {RedigerKnapp} from '../../components/rediger-knapp/rediger-knapp';
import {OversiktType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagret-filter';
import {kebabCase} from '../../utils/utils';
import './mine-filter_innhold.css';

interface MineFilterRadProps {
    filter: LagretFilter;
    oversiktType: OversiktType;
    erValgt: boolean;
}

export function MineFilterRad({filter, oversiktType, erValgt}: MineFilterRadProps) {
    const dispatch = useDispatch();

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(oversiktType));
    }

    return (
        <div className="mine-filter__rad" data-testid="mine-filter_rad-wrapper">
            <Radio
                className="mine-filter__filternavn"
                data-testid={`mine-filter-rad_${kebabCase(filter.filterNavn)}`}
                value={`${filter.filterId}`}
            >
                {filter.filterNavn}
            </Radio>
            {erValgt && (
                <RedigerKnapp
                    aria="Rediger mitt filter"
                    onClick={onClickRedigerKnapp}
                    dataTestid={`rediger-filter_knapp_${kebabCase(filter.filterNavn)}`}
                />
            )}
        </div>
    );
}
