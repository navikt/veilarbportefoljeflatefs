import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
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
    hovedmal,
    registreringstype
} from './filter-konstanter';
import OverskriftMedHjelpeTekst from '../components/overskrift-med-hjelpetekst';
import { RadioFilterformNy } from '../components/radio-filterform/radio-filterform-ny';
import Dropdown from '../components/dropdown/dropdown';
import '../components/checkbox-filterform/checkbox-filterform.less';
import FodselsdatoFilterform from '../components/checkbox-filterform/fodselsdato-filterform';
import { ReactComponent as InfoIkon } from '../components/ikoner/info-ikon.svg';
import { useFeatureSelector } from '../hooks/redux/use-feature-selector';
import { CVJOBBPROFIL } from '../konstanter';
import './filtrering-informasjon-fra-bruker/filtrering-info-fra-bruker.less';
import {GJEM_HOVEDMAL} from '../konstanter';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    enhettiltak: any;
}

function FiltreringFilter ({filtervalg, endreFiltervalg, enhettiltak}: FiltreringFilterProps) {
    const gjemHovedMal = useFeatureSelector()(GJEM_HOVEDMAL);
    return (
            <div className="row">
                <div className="col-sm-12 blokk-xs">
                    <Element className="blokk-xxs" tag="h3">
                        Demografi
                    </Element>
                    <Dropdown
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
                    <Dropdown
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
                    <Dropdown
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
                    {!useFeatureSelector()(CVJOBBPROFIL) &&
                    <Dropdown
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
                    }
                    <Dropdown
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
                    <Dropdown
                        name="Hovedmål"
                        hidden={gjemHovedMal}
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
                    <Dropdown
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
                    <Dropdown
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
                    <Dropdown
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
                    <Dropdown
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
                    <Dropdown
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
                    <Dropdown
                        name="Aktivitet"
                        render={(lukkDropdown) =>
                            <AktivitetFilterform
                                valg={aktiviteter}
                                filtervalg={filtervalg}
                                onSubmit={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        }
                    />
                    <Dropdown
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
    );
}

export default FiltreringFilter;
