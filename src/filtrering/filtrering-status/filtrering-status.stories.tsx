import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {FiltreringStatus} from './filtrering-status';
import {OversiktType} from '../../ducks/ui/listevisning';
import {Provider} from 'react-redux';
import createStore from '../../store';
import '../../components/sidebar/sidebar.css';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';

export default {
    title: 'Filtrering/Status',
    component: FiltreringStatus,
    decorators: [
        Story => (
            <Provider store={createStore()}>
                <Story />
            </Provider>
        )
    ]
} as ComponentMeta<typeof FiltreringStatus>;

export const FiltreringStatus2 = () => {
    const {filtervalg} = usePortefoljeSelector(OversiktType.minOversikt);
    return (
        <div className="veilarbportefoljeflatefs">
            <div className="sidebar" style={{width: '21rem'}}>
                <div className="sidebar__content-container">
                    <FiltreringStatus oversiktType={OversiktType.minOversikt} filtervalg={filtervalg} />
                </div>
            </div>
        </div>
    );
};
