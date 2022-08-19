import {useDispatch} from 'react-redux';
import {apneMineFilterModal} from '../../ducks/lagret-filter-ui-state';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import React, {useEffect} from 'react';
import './mine-filter_innhold.css';
import {OversiktType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagret-filter';
import {kebabCase} from '../../utils/utils';
import {Radio} from '@navikt/ds-react';

interface MineFilterRadProps {
    filter: LagretFilter;
    oversiktType: OversiktType;
    erValgt: boolean;
}

function MineFilterRad({filter, oversiktType, erValgt}: MineFilterRadProps) {
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
            <RedigerKnapp
                hidden={!erValgt}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
                dataTestid={`rediger-filter_knapp_${kebabCase(filter.filterNavn)}`}
            />
        </div>
    );
}

export default MineFilterRad;
