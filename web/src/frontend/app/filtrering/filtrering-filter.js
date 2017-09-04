import React, {PropTypes as PT} from 'react';
import HjelpetekstAuto from 'nav-frontend-hjelpetekst';
import {Element} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';
import Dropdown from '../components/dropdown/dropdown';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
import RadioFilterform from '../components/radio-filterform/radio-filterform';
import AktivitetFilterform from './../components/aktivitet-filterform/aktivitet-filterform';
import {filtervalgShape} from '../proptype-shapes';
import {
    alder,
    fodselsdagIMnd,
    kjonn,
    innsatsgruppe,
    formidlingsgruppe,
    servicegruppe,
    ytelse,
    rettighetsgruppe,
    aktiviteter
} from './filter-konstanter';
import OverskriftMedHjelpeTekst from "../components/overskrift-med-hjelpetekst";

function FiltreringFilter({filtervalg, actions, enhettiltak}) {
    return (
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage id="filtrering.filter.tittel.demografi"/>
                    </Element>
                    <Dropdown name="Alder">
                        <CheckboxFilterform
                            form="alder"
                            valg={alder}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                    <Dropdown name="Fødselsdato">
                        <CheckboxFilterform
                            form="fodselsdagIMnd"
                            valg={fodselsdagIMnd}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                    <Dropdown name="Kjønn">
                        <CheckboxFilterform
                            form="kjonn"
                            valg={kjonn}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                </div>
                <div className="col-sm-3">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage id="filtrering.filter.tittel.situasjon"/>
                    </Element>
                    <Dropdown name="Innsatsgruppe">
                        <CheckboxFilterform
                            form="innsatsgruppe"
                            valg={innsatsgruppe}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                    <Dropdown name="Formidlingsgruppe">
                        <CheckboxFilterform
                            form="formidlingsgruppe"
                            valg={formidlingsgruppe}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                    <Dropdown name="Servicegruppe">
                        <CheckboxFilterform
                            form="servicegruppe"
                            valg={servicegruppe}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                    <Dropdown name="Rettighetsgruppe" className="dropdown--130bredde">
                        <CheckboxFilterform
                            form="rettighetsgruppe"
                            valg={rettighetsgruppe}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                </div>
                <div className="col-sm-3">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage id="filtrering.filter.tittel.ytelse"/>
                    </Element>
                    <Dropdown name="Ytelse" className="dropdown--130bredde">
                        <RadioFilterform
                            form="ytelse"
                            valg={ytelse}
                            onSubmit={actions.endreFiltervalg}
                            filtervalg={filtervalg}
                        />
                    </Dropdown>
                </div>
                <div className="col-sm-3">
                    <OverskriftMedHjelpeTekst
                        overskriftId="filtrering.filter.tittel.aktivitet"
                        hjelpetekstId="hjelpetekst.aktivitetsfilter"
                    />
                    <Dropdown name="Aktivitet" className="dropdown--130bredde" hoyre>
                        <AktivitetFilterform
                            form="aktiviteter"
                            valg={aktiviteter}
                            filtervalg={filtervalg}
                            onSubmit={actions.endreFiltervalg}
                        />
                    </Dropdown>
                    <Dropdown
                        name="Tiltakstype"
                        className="dropdown--130bredde"
                        hoyre
                        disabled={!(filtervalg.aktiviteter.TILTAK === 'JA')}
                    >
                        <CheckboxFilterform
                            form="tiltakstyper"
                            valg={enhettiltak}
                            filtervalg={filtervalg}
                            onSubmit={actions.endreFiltervalg}
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

FiltreringFilter.defaultProps = {
    veileder: {
        veileder: {
            ident: '',
            navn: '',
            fornavn: '',
            etternavn: ''
        }
    }
};

FiltreringFilter.propTypes = {
    enhettiltak: PT.object.isRequired,
    filtervalg: filtervalgShape.isRequired,
    actions: PT.shape({
        endreFiltervalg: PT.func
    }).isRequired
};

export default FiltreringFilter;
