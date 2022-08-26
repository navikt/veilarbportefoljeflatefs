import * as React from 'react';
import CheckboxFilterform from './filterform/checkbox-filterform';
import {
    alder,
    cvJobbprofil,
    fodselsdagIMnd,
    formidlingsgruppe,
    hovedmal,
    innsatsgruppe,
    kjonn,
    manuellBrukerStatus,
    manuellBrukerStatusUtenKRR,
    registreringstype,
    rettighetsgruppe,
    servicegruppe,
    stillingFraNavFilter,
    utdanning,
    ytelse
} from '../filter-konstanter';
import OverskriftMedHjelpeTekst from '../../components/overskrift-med-hjelpetekst';
import Dropdown from '../../components/dropdown/dropdown';
import './filterform/filterform.css';
import FodselsdatoFilterform from './filterform/fodselsdato-filterform';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {GJEM_HOVEDMAL, STILLING_FRA_NAV, UTEN_KRR_FILTER} from '../../konstanter';
import '../filtrering-skjema.css';
import '../../components/sidebar/sidebar.css';
import DoubleCheckboxFilterform from './filterform/double-checkbox-filterform';
import AlderFilterform from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import {HendelserFilterform} from './filterform/hendelser-filterform';
import {OversiktType} from '../../ducks/ui/listevisning';
import AktivitetFilterformController from './filterform/aktiviteter-filterform/aktivitet-filterform-controller';
import {FiltervalgModell} from '../../model-interfaces';
import {Alert, Label} from '@navikt/ds-react';
import GeografiskbostedFilterform from './filterform/geografiskbosted-filterform';
import FoedelandFilterform from './filterform/foedeland-filterform';
import TolkebehovFilterform from './filterform/tolkebehov-filterform';

interface FiltreringFilterProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
    enhettiltak: any;
    oversiktType: OversiktType;
}

function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak, oversiktType}: FiltreringFilterProps) {
    const erGjemHovedmalFeatureTogglePa = useFeatureSelector()(GJEM_HOVEDMAL);
    const erKRRFilterFeatureTogglePa = useFeatureSelector()(UTEN_KRR_FILTER);
    const erStillingFraNavFeatureTogglePa = useFeatureSelector()(STILLING_FRA_NAV);

    return (
        <div className="filtrering-filter filtrering-filter__kolonne" data-testid="filtrering-filter_container">
            <div className="filtrering-filter__kolonne">
                <Label size="small">Om personen</Label>
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
                <Dropdown
                    name="Fødselsdato"
                    id="fodselsdato"
                    render={() => (
                        <FodselsdatoFilterform
                            form="fodselsdagIMnd"
                            valg={fodselsdagIMnd()}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Kjønn"
                    id="kjonn"
                    render={() => (
                        <RadioFilterform
                            valg={kjonn}
                            endreFiltervalg={endreFiltervalg}
                            filtervalg={filtervalg}
                            form="kjonn"
                            gridColumns={2}
                        />
                    )}
                />
                <Dropdown
                    name="Geografisk bosted"
                    id="bosted"
                    render={() => (
                        <GeografiskbostedFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                    )}
                />
                <Dropdown
                    name="Fødeland"
                    id="foedeland"
                    render={() => <FoedelandFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />}
                />
                <Dropdown
                    name="Tolkebehov"
                    id="tolkebehov"
                    render={() => <TolkebehovFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Hendelser</Label>
                <Dropdown
                    name="Siste endring av bruker"
                    id="sisteEndringKategori"
                    render={() => (
                        <HendelserFilterform
                            form="sisteEndringKategori"
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            endreCheckboxFiltervalg={endreFiltervalg}
                            oversiktType={oversiktType}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label>Svar fra registrering</Label>
                <Dropdown
                    name="Situasjon"
                    id="situasjon"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Svarene brukeren oppga på registreringstidspunktet.
                            </Alert>
                            <CheckboxFilterform
                                form="registreringstype"
                                valg={registreringstype}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                className="registreringstype"
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Høyeste fullførte utdanning"
                    id="hoyeste-fullforte-utdanning"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Svarene brukeren oppga på registreringstidspunktet.
                            </Alert>
                            <CheckboxFilterform
                                form="utdanning"
                                valg={utdanning}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Er utdanningen godkjent og bestått"
                    id="er-utdanningen-godkjent-og-bestatt"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Svarene brukeren oppga på registreringstidspunktet.
                            </Alert>
                            <DoubleCheckboxFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                        </>
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Status og brukergrupper</Label>
                <Dropdown
                    name="CV og jobbønsker"
                    id="cv-og-jobbprofil"
                    render={() => (
                        <RadioFilterform
                            valg={cvJobbprofil}
                            endreFiltervalg={endreFiltervalg}
                            filtervalg={filtervalg}
                            form="cvJobbprofil"
                        />
                    )}
                />
                <Dropdown
                    name="Innsatsgruppe"
                    id="innsatsgruppe"
                    render={() => (
                        <CheckboxFilterform
                            form="innsatsgruppe"
                            valg={innsatsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Hovedmål"
                    id="hovedmal"
                    hidden={erGjemHovedmalFeatureTogglePa}
                    render={() => (
                        <CheckboxFilterform
                            form="hovedmal"
                            valg={hovedmal}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Formidlingsgruppe"
                    id="formidlingsgruppe"
                    render={() => (
                        <CheckboxFilterform
                            form="formidlingsgruppe"
                            valg={formidlingsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Servicegruppe"
                    id="servicegruppe"
                    render={() => (
                        <CheckboxFilterform
                            form="servicegruppe"
                            valg={servicegruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Manuell oppfølging"
                    id="manuell-oppfolging"
                    render={() => (
                        <CheckboxFilterform
                            form="manuellBrukerStatus"
                            valg={erKRRFilterFeatureTogglePa ? manuellBrukerStatusUtenKRR : manuellBrukerStatus}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Rettighetsgruppe og ytelse</Label>
                <Dropdown
                    name="Rettighetsgruppe"
                    id="rettighetsgruppe"
                    render={() => (
                        <CheckboxFilterform
                            form="rettighetsgruppe"
                            valg={rettighetsgruppe}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Ytelse"
                    id="ytelse"
                    render={() => (
                        <RadioFilterform
                            valg={ytelse}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            form="ytelse"
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <OverskriftMedHjelpeTekst
                    overskriftTekst="Aktivitet"
                    hjelpeTekst="Visning av aktiviteter og dato i liste gjelder kun avtalte aktiviteter bruker har med NAV."
                />
                <Dropdown
                    name="Stilling fra Nav"
                    id="stillingFraNav"
                    hidden={!erStillingFraNavFeatureTogglePa}
                    render={() => (
                        <CheckboxFilterform
                            form="stillingFraNavFilter"
                            valg={stillingFraNavFilter}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Aktivitet"
                    id="aktivitet"
                    render={() => (
                        <AktivitetFilterformController filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                    )}
                />
                <Dropdown
                    name="Tiltakstype"
                    id="tiltakstype"
                    render={() => (
                        <CheckboxFilterform
                            form="tiltakstyper"
                            valg={enhettiltak}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
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
