import * as React from 'react';
import {Element, Normaltekst} from 'nav-frontend-typografi';
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
    utdanning,
    ytelse
} from '../filter-konstanter';
import OverskriftMedHjelpeTekst from '../../components/overskrift-med-hjelpetekst';
import Dropdown from '../../components/dropdown/dropdown';
import './filterform/filterform.less';
import FodselsdatoFilterform from './filterform/fodselsdato-filterform';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {GJEM_HOVEDMAL, UTEN_KRR_FILTER, SISTE_ENDRING} from '../../konstanter';
import '../filtrering-skjema.less';
import '../../components/sidebar/sidebar.less';
import {PopoverOrientering} from 'nav-frontend-popover';
import DoubleCheckboxFilterform from './filterform/double-checkbox-filterform';
import AlderFilterform from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import {ReactComponent as InfoIkon} from '../../components/ikoner/info-ikon.svg';
import {HendelserFilterform} from './filterform/hendelser-filterform';
import {OversiktType} from '../../ducks/ui/listevisning';
import AktivitetFilterformController from './filterform/aktiviteter-filterform/aktivitet-filterform-controller';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    enhettiltak: any;
    oversiktType: OversiktType;
}

function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak, oversiktType}: FiltreringFilterProps) {
    const erGjemHovedmalFeatureTogglePa = useFeatureSelector()(GJEM_HOVEDMAL);
    const erSisteEndringFeatureTogglePa = useFeatureSelector()(SISTE_ENDRING);
    const erKRRFilterFeatureTogglePa = useFeatureSelector()(UTEN_KRR_FILTER);

    return (
        <div
            className="filtrering-filter col-sm-12 blokk-xs filtrering-filter__kolonne"
            data-testid="filtrering-filter_container"
        >
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Demografi</Element>
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
                        />
                    )}
                />
            </div>
            {erSisteEndringFeatureTogglePa && (
                <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                    <Element className="blokk-xxs">Hendelser</Element>
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
            )}
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Svar fra registrering</Element>
                <Dropdown
                    name="Situasjon"
                    id="situasjon"
                    render={() => (
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
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Er utdanningen godkjent og bestått"
                    id="er-utdanningen-godkjent-og-bestatt"
                    render={() => (
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon" />
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Svarene brukeren oppga på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            <DoubleCheckboxFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                        </>
                    )}
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Status og brukergrupper</Element>
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
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Rettighetsgruppe og ytelse</Element>
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
            <div className="col-sm-12 filtrering-filter__kolonne">
                <OverskriftMedHjelpeTekst
                    overskriftTekst="Aktivitet"
                    hjelpeTekst="Visning av aktiviteter og dato i liste gjelder kun avtalte aktiviteter bruker har med NAV."
                    orientering={PopoverOrientering.Hoyre}
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
