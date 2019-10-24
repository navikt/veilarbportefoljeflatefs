import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Dropdown from '../components/dropdown/dropdown';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
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
import { RadioFilterformNy } from '../components/radio-filterform/radio-filterform-ny';
import DropdownNy from '../components/dropdown/dropdown-ny';

import '../components/checkbox-filterform/checkbox-filterform.less';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    enhettiltak: any;
    intl?: any;
}

const FiltreringFilter = ({filtervalg, endreFiltervalg, enhettiltak}: FiltreringFilterProps) => (
    <div>
        <div className="row">
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Demografi
                </Element>
                <Dropdown name="Alder">
                    <CheckboxFilterform
                        id="id_alder"
                        form="alder"
                        kolonner={2}
                        valg={alder}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Fødselsdato">
                    <CheckboxFilterform
                        form="fodselsdagIMnd"
                        valg={fodselsdagIMnd()}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Kjønn">
                    <CheckboxFilterform
                        id="id_kjonn"
                        form="kjonn"
                        valg={kjonn}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Situasjon
                </Element>
                <Dropdown name="Innsatsgruppe">
                    <CheckboxFilterform
                        form="innsatsgruppe"
                        valg={innsatsgruppe}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Hovedmål">
                    <CheckboxFilterform
                        form="hovedmal"
                        valg={hovedmal}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Formidlingsgruppe">
                    <CheckboxFilterform
                        form="formidlingsgruppe"
                        valg={formidlingsgruppe}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Servicegruppe">
                    <CheckboxFilterform
                        form="servicegruppe"
                        valg={servicegruppe}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <Dropdown name="Manuell oppfølging">
                    <CheckboxFilterform
                        form="manuellBrukerStatus"
                        valg={manuellBrukerStatus}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Rettighetsgruppe og ytelse
                </Element>
                <Dropdown name="Rettighetsgruppe">
                    <CheckboxFilterform
                        form="rettighetsgruppe"
                        valg={rettighetsgruppe}
                        onSubmit={endreFiltervalg}
                        filtervalg={filtervalg}
                    />
                </Dropdown>
                <DropdownNy
                    name="Ytelse"
                    className="dropdown--140bredde-responsive"
                    render={(lukkDropdown) =>
                        <RadioFilterformNy
                            valg={ytelse}
                            onSubmit={endreFiltervalg}
                            filtervalg={filtervalg}
                            closeDropdown={lukkDropdown}
                            filterId="ytelse"
                        />
                    }
                />
            </div>
            <div className="col-sm-12">
                <OverskriftMedHjelpeTekst
                    overskriftTekst="Aktivitet"
                    hjelpeTekst="Visning av aktiviteter og dato i liste gjelder kun avtalte aktiviteter bruker har med NAV."
                />
                <Dropdown name="Aktivitet" className="dropdown--140bredde-responsive">
                    <AktivitetFilterform
                        form="aktiviteter"
                        valg={aktiviteter}
                        filtervalg={filtervalg}
                        onSubmit={endreFiltervalg}
                    />
                </Dropdown>
                <Dropdown
                    name="Tiltakstype"
                    disabled={!(filtervalg.aktiviteter.TILTAK === 'JA')}
                >
                    <CheckboxFilterform
                        id="id_tiltakstyper"
                        form="tiltakstyper"
                        valg={enhettiltak}
                        filtervalg={filtervalg}
                        onSubmit={endreFiltervalg}
                    />
                </Dropdown>
            </div>
        </div>
    </div>
);

export default FiltreringFilter;
