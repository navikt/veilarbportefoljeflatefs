import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {markerAlleBrukere} from '../../ducks/portefolje';
import './toolbar.css';
import {Checkbox} from '@navikt/ds-react';

interface VelgalleCheckboksProps {
    disabled: boolean;
    alleMarkert: boolean;
    markerAlle: (markert: boolean) => void;
    className: string;
}

function VelgAlleCheckboks({disabled, markerAlle, alleMarkert, className}: VelgalleCheckboksProps) {
    const onClickHandler = () => {
        markerAlle(!alleMarkert);
    };

    return (
        <Checkbox
            className={className}
            checked={alleMarkert}
            disabled={disabled}
            hideLabel
            onChange={onClickHandler}
            size="small"
        >
            Velg alle
        </Checkbox>
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
