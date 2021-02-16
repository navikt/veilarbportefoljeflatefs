import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {finnSideNavn, mapVeilederIdentTilNonsens} from '../../middleware/metrics-middleware';
import {logEvent} from '../../utils/frontend-logger';
import {velgMineFilter} from '../../ducks/filtrering';
import {
    apneFeilTiltakModal,
    apneMineFilterModal,
    avmarkerValgtMineFilter,
    markerMineFilter
} from '../../ducks/lagret-filter-ui-state';
import {Radio} from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import React from 'react';
import './mine-filter_innhold.less';
import {OversiktType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagret-filter';
import {kebabCase} from '../../utils/utils';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';

interface MineFilterRadProps {
    mineFilter: LagretFilter;
    oversiktType: OversiktType;
    enhettiltak: OrNothing<Tiltak>;
}

function MineFilterRad({mineFilter, oversiktType, enhettiltak}: MineFilterRadProps) {
    const dispatch = useDispatch();

    const valgtMineFilter = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt
            ? state.mineFilterMinOversikt.valgtMineFilter
            : state.mineFilterEnhetensOversikt.valgtMineFilter
    );

    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    const mapTiltakTilLabel = () => {
        let counter = 0;
        mineFilter.filterValg.tiltakstyper.map(tiltak => {
            if (enhettiltak && enhettiltak[tiltak] === undefined) {
                counter++;
            }
            return counter;
        });
        return counter;
    };

    function velgFilter() {
        logEvent(
            'portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {},
            {
                filterId: mineFilter.filterId,
                sideNavn: finnSideNavn(),
                id: veilederIdentTilNonsens
            }
        );

        if (mapTiltakTilLabel()) {
            dispatch(markerMineFilter(mineFilter, oversiktType));
            dispatch(apneFeilTiltakModal(oversiktType));
            dispatch(avmarkerValgtMineFilter(oversiktType));
        } else {
            dispatch(markerMineFilter(mineFilter, oversiktType));
            dispatch(velgMineFilter(mineFilter, oversiktType));
        }
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(oversiktType));
    }

    return (
        <div className="mine-filter__rad" data-testid="mine-filter_rad-wrapper">
            <Radio
                className="mine-filter__filternavn"
                key={mineFilter.filterId}
                name="mineFilter"
                label={mineFilter.filterNavn}
                value={mineFilter.filterId}
                onChange={() => velgFilter()}
                checked={valgtMineFilter?.filterId === mineFilter.filterId}
                data-testid={`mine-filter-rad_${kebabCase(mineFilter.filterNavn)}`}
            />
            <RedigerKnapp
                hidden={valgtMineFilter?.filterId !== mineFilter.filterId}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
                dataTestid={`rediger-filter_knapp_${kebabCase(mineFilter.filterNavn)}`}
            />
        </div>
    );
}

export default MineFilterRad;
