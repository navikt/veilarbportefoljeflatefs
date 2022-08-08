import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {markerAlleBrukere} from '../../ducks/portefolje';
import './toolbar.css';
import {Checkbox} from 'nav-frontend-skjema';

interface VelgalleCheckboksProps {
    skalVises: boolean;
    disabled: boolean;
    alleMarkert: boolean;
    markerAlle: (markert: boolean) => void;
    className: string;
}

function VelgAlleCheckboks({skalVises, disabled, markerAlle, alleMarkert, className}: VelgalleCheckboksProps) {
    if (!skalVises) {
        return null;
    }
    const onClickHandler = () => markerAlle(!alleMarkert);

    return (
        <Checkbox
            label={''}
            className={className}
            checked={alleMarkert}
            disabled={disabled}
            onChange={onClickHandler}
            title="Velg alle checkbox"
            aria-label="Velg alle checkboxer"
            role="checkbox"
        />
    );
}

const mapStateToProps = state => {
    const brukere = state.portefolje.data.brukere;
    const alleMarkert =
        brukere.length > 0 && brukere.every(bruker => (bruker.fnr !== '' && bruker.markert) || bruker.fnr === '');
    const disabled = brukere.length === 0;

    return {alleMarkert, disabled};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            markerAlle: markerAlleBrukere
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(VelgAlleCheckboks);
