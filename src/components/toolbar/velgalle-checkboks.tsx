import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Checkbox} from '@navikt/ds-react';
import {markerAlleBrukere} from '../../ducks/portefolje';
import './toolbar.css';

interface VelgalleCheckboksProps {
    disabled: boolean;
    alleMarkert: boolean;
    markerAlle: (markert: boolean) => void;
}

function VelgAlleCheckboks({disabled, markerAlle, alleMarkert}: VelgalleCheckboksProps) {
    const onClickHandler = () => {
        markerAlle(!alleMarkert);
    };

    return (
        <Checkbox
            size="small"
            checked={alleMarkert}
            disabled={disabled}
            hideLabel
            onChange={onClickHandler}
            className="velgalle-checkboks"
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
