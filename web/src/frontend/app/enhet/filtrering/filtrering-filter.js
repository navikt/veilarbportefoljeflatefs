import React from 'react';
import { Element } from 'nav-frontend-typografi';
import Dropdown from './../../components/dropdown/dropdown';
import CheckboxFilterform from './../../components/checkbox-filterform/checkbox-filterform';
import RadioFilterform from './../../components/radio-filterform/radio-filterform';
import {
    alder,
    fodselsdag,
    kjonn,
    innsatsgrupper,
    formidlingsgrupper,
    servicegrupper,
    ytelser
} from './filterKonstanter';

function FiltreringFilter() {
    return (
        <div className="filtrering-filter">
            <div className="row">
                <div className="col-sm-3">
                    <Element>Demografi</Element>
                    <Dropdown name="Alder">
                        <CheckboxFilterform form="alder" valg={alder}/>
                    </Dropdown>
                    <Dropdown name="Fødselsdato">
                        <CheckboxFilterform form="fodselsdagIMnd" valg={fodselsdag}/>
                    </Dropdown>
                    <Dropdown name="Kjønn">
                        <CheckboxFilterform form="kjonn" valg={kjonn}/>
                    </Dropdown>
                </div>
                <div className="col-sm-3">
                    <Element>Situasjon</Element>
                    <Dropdown name="Innsatsgruppe">
                        <CheckboxFilterform form="innsatsgruppe" valg={innsatsgrupper}/>
                    </Dropdown>
                    <Dropdown name="Formidlingsgruppe">
                        <CheckboxFilterform form="formidlingsgruppe" valg={formidlingsgrupper}/>
                    </Dropdown>
                    <Dropdown name="Servicegruppe">
                        <CheckboxFilterform form="servicegruppe" valg={servicegrupper}/>
                    </Dropdown>
                </div>
                <div className="col-sm-3">
                    <Element>Ytelse</Element>
                    <Dropdown name="Ytelse">
                        <RadioFilterform form="ytelse" valg={ytelser}/>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

FiltreringFilter.propTypes = {};

export default FiltreringFilter;
