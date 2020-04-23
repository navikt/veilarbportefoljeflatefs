import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
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
    hovedmal, registreringstype
} from './filter-konstanter';
import OverskriftMedHjelpeTekst from '../components/overskrift-med-hjelpetekst';
import { RadioFilterformNy } from '../components/radio-filterform/radio-filterform-ny';
import DropdownNy from '../components/dropdown/dropdown-ny';
import '../components/checkbox-filterform/checkbox-filterform.less';
import FodselsdatoFilterform from '../components/checkbox-filterform/fodselsdato-filterform';
import { ReactComponent as InfoIkon } from '../components/ikoner/info-ikon.svg';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    enhettiltak: any;
}

const FiltreringFilter = ({filtervalg, endreFiltervalg, enhettiltak}: FiltreringFilterProps) => (

    <div>
        <div className="row">
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Demografi
                </Element>
                <DropdownNy
                    name="Alder"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="alder"
                            valg={alder}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                            columns={2}
                        />
                    }
                />
                <DropdownNy
                    name="Fødselsdato"
                    render={(lukkDropdown) =>
                        <FodselsdatoFilterform
                            form="fodselsdagIMnd"
                            valg={fodselsdagIMnd()}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Kjønn"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="kjonn"
                            filtervalg={filtervalg}
                            valg={kjonn}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                            columns={2}
                        />
                    }
                />
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Situasjon
                </Element>
                <DropdownNy
                    name="Svar fra registrering"
                    render={(lukkDropdown) =>
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon"/>
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Situasjonen brukeren oppgir på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            <CheckboxFilterform
                                form="registreringstype"
                                valg={registreringstype}
                                filtervalg={filtervalg}
                                endreFilterValg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                                className="registreringstype"
                            />
                        </>
                    }
                />
                <DropdownNy
                    name="Innsatsgruppe"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="innsatsgruppe"
                            valg={innsatsgruppe}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Hovedmål"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="hovedmal"
                            valg={hovedmal}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Formidlingsgruppe"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="formidlingsgruppe"
                            valg={formidlingsgruppe}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Servicegruppe"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="servicegruppe"
                            valg={servicegruppe}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Manuell oppfølging"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="manuellBrukerStatus"
                            valg={manuellBrukerStatus}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
            </div>
            <div className="col-sm-12 blokk-xs">
                <Element className="blokk-xxs" tag="h3">
                    Rettighetsgruppe og ytelse
                </Element>
                <DropdownNy
                    name="Rettighetsgruppe"
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="rettighetsgruppe"
                            valg={rettighetsgruppe}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
                <DropdownNy
                    name="Ytelse"
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
                <Dropdown name="Aktivitet">
                    <AktivitetFilterform
                        valg={aktiviteter}
                        filtervalg={filtervalg}
                        onSubmit={endreFiltervalg}
                    />
                </Dropdown>
                <DropdownNy
                    name="Tiltakstype"
                    disabled={!(filtervalg.aktiviteter.TILTAK === 'JA')}
                    render={(lukkDropdown) =>
                        <CheckboxFilterform
                            form="tiltakstyper"
                            valg={enhettiltak}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    }
                />
            </div>
        </div>
    </div>
);

export default FiltreringFilter;
