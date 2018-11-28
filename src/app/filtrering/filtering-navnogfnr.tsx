import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { rules, validForm } from 'react-redux-form-validation';
import {Input} from 'nav-frontend-skjema';
import {dispatchEndreFiltervalg} from "../ducks/filtrering";


function FiltreringNavnOgFnr({onChange, navnEllerFnrQuery}) {
    return (
        <div className="row">
            <div className="col-md-5">
                <Input
                    label=""
                    placeholder= "Søk navn eller fødselsnummer"
                    onChange={onChange}
                    value={navnEllerFnrQuery}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    navnEllerFnrQuery: state.filtreringMinoversikt.navnEllerFnrQuery,
});

const mapDispatchToProps = (dispatch, props) => ({
    onChange: (event) => {
        dispatchEndreFiltervalg('navnEllerFnrQuery', event.target.value, props.filtergruppe)(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringNavnOgFnr);

