import * as React from 'react';
import {Element, Normaltekst} from 'nav-frontend-typografi';
import CheckboxFilterform from './filterform/checkbox-filterform';
import {
    aktiviteter,
    alder,
    cvJobbprofil,
    fodselsdagIMnd,
    formidlingsgruppe,
    hovedmal,
    innsatsgruppe,
    kjonn,
    manuellBrukerStatus,
    registreringstype,
    rettighetsgruppe,
    servicegruppe,
    ytelse,
    utdanning
} from '../filter-konstanter';
import OverskriftMedHjelpeTekst from '../../components/overskrift-med-hjelpetekst';
import Dropdown from '../../components/dropdown/dropdown';
import './filterform/filterform.less';
import FodselsdatoFilterform from './filterform/fodselsdato-filterform';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {ALDER_FILTER, GJEM_HOVEDMAL} from '../../konstanter';
import '../filtrering-skjema.less';
import '../../components/sidebar/sidebar.less';
import {PopoverOrientering} from 'nav-frontend-popover';
import DoubleCheckboxFilterform from './filterform/double-checkbox-filterform';
import AlderFilterform from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import AktivitetFilterform from './filterform/aktivitet-filterform';
import {ReactComponent as InfoIkon} from '../../components/ikoner/info-ikon.svg';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    enhettiltak: any;
}

function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak}: FiltreringFilterProps) {
    const erGjemHovedmalFeatureTogglePa = useFeatureSelector()(GJEM_HOVEDMAL);
    const erAlderFeatureTogglePa = useFeatureSelector()(ALDER_FILTER);

    return (
        <div
            className="filtrering-filter col-sm-12 blokk-xs filtrering-filter__kolonne"
            data-testid="filtrering-filter_container"
        >
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs" tag="h3">
                    Demografi
                </Element>
                {erAlderFeatureTogglePa ? (
                    <Dropdown
                        name="Alder"
                        id="alder"
                        render={lukkDropdown => (
                            <AlderFilterform
                                form="alder"
                                valg={alder}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )}
                    />
                ) : (
                    <Dropdown
                        name="Alder"
                        id="alder"
                        render={lukkDropdown => (
                            <CheckboxFilterform
                                form="alder"
                                valg={alder}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                                columns={2}
                            />
                        )}
                    />
                )}
                <Dropdown
                    name="Fødselsdato"
                    id="fodselsdato"
                    render={lukkDropdown => (
                        <FodselsdatoFilterform
                            form="fodselsdagIMnd"
                            valg={fodselsdagIMnd()}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Kjønn"
                    id="kjonn"
                    render={lukkDropdown => (
                        <RadioFilterform
                            valg={kjonn}
                            endreFiltervalg={endreFiltervalg}
                            filtervalg={filtervalg}
                            closeDropdown={lukkDropdown}
                            form="kjonn"
                        />
                    )}
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs" tag="h3">
                    Svar fra registrering
                </Element>
                <Dropdown
                    name="Situasjon"
                    id="situasjon"
                    render={lukkDropdown => (
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon" />
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Svarene brukeren oppga på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            <CheckboxFilterform
                                form="registreringstype"
                                valg={registreringstype}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                                className="registreringstype"
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Høyeste fullførte utdanning"
                    id="hoyeste-fullforte-utdanning"
                    render={lukkDropdown => (
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon" />
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Svarene brukeren oppga på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            <CheckboxFilterform
                                form="utdanning"
                                valg={utdanning}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Er utdanningen godkjent og bestått"
                    id="er-utdanningen-godkjent-og-bestatt"
                    render={lukkDropdown => (
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon" />
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Svarene brukeren oppga på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            <DoubleCheckboxFilterform
                                filtervalg={filtervalg}
                                closeDropdown={lukkDropdown}
                                endreFiltervalg={endreFiltervalg}
                            />
                        </>
                    )}
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs" tag="h3">
                    Status og brukergrupper
                </Element>
                <Dropdown
                    name="CV og jobbprofil"
                    id="cv-og-jobbprofil"
                    render={lukkDropdown => (
                        <RadioFilterform
                            valg={cvJobbprofil}
                            endreFiltervalg={endreFiltervalg}
                            filtervalg={filtervalg}
                            closeDropdown={lukkDropdown}
                            form="cvJobbprofil"
                        />
                    )}
                />
                <Dropdown
                    name="Innsatsgruppe"
                    id="innsatsgruppe"
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="innsatsgruppe"
                            valg={innsatsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Hovedmål"
                    id="hovedmal"
                    hidden={erGjemHovedmalFeatureTogglePa}
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="hovedmal"
                            valg={hovedmal}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Formidlingsgruppe"
                    id="formidlingsgruppe"
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="formidlingsgruppe"
                            valg={formidlingsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Servicegruppe"
                    id="servicegruppe"
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="servicegruppe"
                            valg={servicegruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Manuell oppfølging"
                    id="manuell-oppfolging"
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="manuellBrukerStatus"
                            valg={manuellBrukerStatus}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs" tag="h3">
                    Rettighetsgruppe og ytelse
                </Element>
                <Dropdown
                    name="Rettighetsgruppe"
                    id="rettighetsgruppe"
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="rettighetsgruppe"
                            valg={rettighetsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Ytelse"
                    id="ytelse"
                    render={lukkDropdown => (
                        <RadioFilterform
                            valg={ytelse}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                            form="ytelse"
                        />
                    )}
                />
            </div>
            <div className="col-sm-12 filtrering-filter__kolonne">
                <OverskriftMedHjelpeTekst
                    overskriftTekst="Aktivitet"
                    hjelpeTekst="Visning av aktiviteter og dato i liste gjelder kun avtalte aktiviteter bruker har med NAV."
                    orientering={PopoverOrientering.Hoyre}
                />
                <Dropdown
                    name="Aktivitet"
                    id="aktivitet"
                    render={lukkDropdown => (
                        <AktivitetFilterform
                            valg={aktiviteter}
                            filtervalg={filtervalg}
                            closeDropdown={lukkDropdown}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Tiltakstype"
                    id="tiltakstype"
                    disabled={!(filtervalg.aktiviteter.TILTAK === 'JA')}
                    render={lukkDropdown => (
                        <CheckboxFilterform
                            form="tiltakstyper"
                            valg={enhettiltak}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                            emptyCheckboxFilterFormMessage="Ingen tiltak funnet"
                            className="tiltakstyper"
                        />
                    )}
                />
            </div>
        </div>
    );
}

export default FiltreringFilter;
