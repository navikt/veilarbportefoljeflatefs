import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl } from 'react-intl';
import Dropdown from '../components/dropdown/dropdown';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
import RadioFilterform from '../components/radio-filterform/radio-filterform';
import AktivitetFilterform from '../components/aktivitet-filterform/aktivitet-filterform';
import {
    aktiviteter,
    alder,
    fodselsdagIMnd,
    formidlingsgruppe,
    innsatsgruppe,
    kjonn,
    rettighetsgruppe,
    servicegruppe,
    ytelse,
    manuellBrukerStatus,
    hovedmal
} from './filter-konstanter';

import OverskriftMedHjelpeTekst from '../components/overskrift-med-hjelpetekst';

interface FiltreringFilterProps {
    filtervalg: any;
    actions: any;
    enhettiltak: any;
    intl?: any;
}

// Midlertidig component til feature toggle er fjernet og
const FiltreringFilter = ({filtervalg, actions, enhettiltak, intl}: FiltreringFilterProps) => (
    <div>
        <div className="row">
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage id="filtrering.filter.tittel.demografi"/>
                </Element>
                <Dropdown name="Alder">
                    <CheckboxFilterform
                        form="alder"
                        valg={alder(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Fødselsdato">
                    <CheckboxFilterform
                        form="fodselsdagIMnd"
                        valg={fodselsdagIMnd()}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Kjønn">
                    <CheckboxFilterform
                        form="kjonn"
                        valg={kjonn()}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage id="filtrering.filter.tittel.situasjon"/>
                </Element>
                <Dropdown name="Innsatsgruppe">
                    <CheckboxFilterform
                        form="innsatsgruppe"
                        valg={innsatsgruppe(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Hovedmål">
                    <CheckboxFilterform
                        form="hovedmal"
                        valg={hovedmal(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Formidlingsgruppe">
                    <CheckboxFilterform
                        form="formidlingsgruppe"
                        valg={formidlingsgruppe(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Servicegruppe">
                    <CheckboxFilterform
                        form="servicegruppe"
                        valg={servicegruppe(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Rettighetsgruppe">
                    <CheckboxFilterform
                        form="rettighetsgruppe"
                        valg={rettighetsgruppe(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage id="filtrering.filter.tittel.ytelse"/>
                </Element>
                <Dropdown name="Ytelse" className="dropdown--140bredde-responsive">
                    <RadioFilterform
                        form="ytelse"
                        valg={ytelse(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage id="filtrering.filter.tittel.manuellbruker"/>
                </Element>
                <Dropdown name="Manuell bruker">
                    <CheckboxFilterform
                        form="manuellBrukerStatus"
                        valg={manuellBrukerStatus(intl)}
                        onSubmit={actions.endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12">
                <OverskriftMedHjelpeTekst
                    overskriftId="filtrering.filter.tittel.aktivitet"
                    hjelpetekstId="hjelpetekst.aktivitetsfilter"
                />
                <Dropdown name="Aktivitet" className="dropdown--140bredde-responsive">
                    <AktivitetFilterform
                        form="aktiviteter"
                        valg={aktiviteter(intl)}
                        filtervalg={filtervalg}
                        onSubmit={actions.endreFiltervalg}
                    />
                </Dropdown>
                <Dropdown
                    name="Tiltakstype"
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

export default injectIntl(FiltreringFilter);
