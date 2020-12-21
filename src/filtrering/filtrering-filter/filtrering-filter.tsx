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
    utdanning,
    ytelse
} from '../filter-konstanter';
import OverskriftMedHjelpeTekst from '../../components/overskrift-med-hjelpetekst';
import Dropdown from '../../components/dropdown/dropdown';
import './filterform/filterform.less';
import FodselsdatoFilterform from './filterform/fodselsdato-filterform';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {ALDER_FILTER, GJEM_HOVEDMAL, LIVE_FILTRERING, SISTE_ENDRING} from '../../konstanter';
import '../filtrering-skjema.less';
import '../../components/sidebar/sidebar.less';
import {PopoverOrientering} from 'nav-frontend-popover';
import DoubleCheckboxFilterform from './filterform/double-checkbox-filterform';
import AlderFilterform from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import AktivitetFilterform from './filterform/aktivitet-filterform';
import {ReactComponent as InfoIkon} from '../../components/ikoner/info-ikon.svg';
import GammelAktivitetFilterform from './filterform/gammel_aktivitet-filterform';
import GammelAlderFilterform from './filterform/gammel_alder-filterform';
import GammelCheckboxFilterform from './filterform/gammel_checkbox-filterform';
import GammelDoubleCheckboxFilterform from './filterform/gammel_double-checkbox-filterform';
import GammelFodselsdatoFilterform from './filterform/gammel_fodselsdato-filterform';
import GammelRadioFilterform from './filterform/gammel_radio-filterform';
import {HendelserFilterform} from './filterform/hendelser-filterform';

interface FiltreringFilterProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    enhettiltak: any;
}

function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak}: FiltreringFilterProps) {
    const erGjemHovedmalFeatureTogglePa = useFeatureSelector()(GJEM_HOVEDMAL);
    const erAlderFeatureTogglePa = useFeatureSelector()(ALDER_FILTER);
    const erLiveFiltreringFeatureTogglePa = useFeatureSelector()(LIVE_FILTRERING);
    const erSisteEndringFeatureTogglePa = useFeatureSelector()(SISTE_ENDRING);

    return (
        <div
            className="filtrering-filter col-sm-12 blokk-xs filtrering-filter__kolonne"
            data-testid="filtrering-filter_container"
        >
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Demografi</Element>
                {erAlderFeatureTogglePa ? (
                    <Dropdown
                        name="Alder"
                        id="alder"
                        render={lukkDropdown =>
                            erLiveFiltreringFeatureTogglePa ? (
                                <AlderFilterform
                                    form="alder"
                                    valg={alder}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    closeDropdown={lukkDropdown}
                                />
                            ) : (
                                <GammelAlderFilterform
                                    form="alder"
                                    valg={alder}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    closeDropdown={lukkDropdown}
                                />
                            )
                        }
                    />
                ) : (
                    <Dropdown
                        name="Alder"
                        id="alder"
                        render={lukkDropdown =>
                            erLiveFiltreringFeatureTogglePa ? (
                                <CheckboxFilterform
                                    form="alder"
                                    valg={alder}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    columns={2}
                                />
                            ) : (
                                <GammelCheckboxFilterform
                                    form="alder"
                                    valg={alder}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    closeDropdown={lukkDropdown}
                                    columns={2}
                                />
                            )
                        }
                    />
                )}
                <Dropdown
                    name="Fødselsdato"
                    id="fodselsdato"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <FodselsdatoFilterform
                                form="fodselsdagIMnd"
                                valg={fodselsdagIMnd()}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelFodselsdatoFilterform
                                form="fodselsdagIMnd"
                                valg={fodselsdagIMnd()}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Kjønn"
                    id="kjonn"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <RadioFilterform
                                valg={kjonn}
                                endreFiltervalg={endreFiltervalg}
                                filtervalg={filtervalg}
                                form="kjonn"
                            />
                        ) : (
                            <GammelRadioFilterform
                                valg={kjonn}
                                endreFiltervalg={endreFiltervalg}
                                filtervalg={filtervalg}
                                closeDropdown={lukkDropdown}
                                form="kjonn"
                            />
                        )
                    }
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
                    render={lukkDropdown => (
                        <>
                            <div className="registreringsfilter__infocontainer">
                                <InfoIkon className="registreringsfilter__infoikon" />
                                <Normaltekst className="registreringsfilter__infotekst">
                                    Svarene brukeren oppga på registreringstidspunktet.
                                </Normaltekst>
                            </div>
                            {erLiveFiltreringFeatureTogglePa ? (
                                <CheckboxFilterform
                                    form="registreringstype"
                                    valg={registreringstype}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    className="registreringstype"
                                />
                            ) : (
                                <GammelCheckboxFilterform
                                    form="registreringstype"
                                    valg={registreringstype}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    closeDropdown={lukkDropdown}
                                    className="registreringstype"
                                />
                            )}
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
                            {erLiveFiltreringFeatureTogglePa ? (
                                <CheckboxFilterform
                                    form="utdanning"
                                    valg={utdanning}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                />
                            ) : (
                                <GammelCheckboxFilterform
                                    form="utdanning"
                                    valg={utdanning}
                                    filtervalg={filtervalg}
                                    endreFiltervalg={endreFiltervalg}
                                    closeDropdown={lukkDropdown}
                                />
                            )}
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
                            {erLiveFiltreringFeatureTogglePa ? (
                                <DoubleCheckboxFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                            ) : (
                                <GammelDoubleCheckboxFilterform
                                    filtervalg={filtervalg}
                                    closeDropdown={lukkDropdown}
                                    endreFiltervalg={endreFiltervalg}
                                />
                            )}
                        </>
                    )}
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Status og brukergrupper</Element>
                <Dropdown
                    name="CV og jobbprofil"
                    id="cv-og-jobbprofil"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <RadioFilterform
                                valg={cvJobbprofil}
                                endreFiltervalg={endreFiltervalg}
                                filtervalg={filtervalg}
                                form="cvJobbprofil"
                            />
                        ) : (
                            <GammelRadioFilterform
                                valg={cvJobbprofil}
                                endreFiltervalg={endreFiltervalg}
                                filtervalg={filtervalg}
                                closeDropdown={lukkDropdown}
                                form="cvJobbprofil"
                            />
                        )
                    }
                />
                <Dropdown
                    name="Innsatsgruppe"
                    id="innsatsgruppe"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="innsatsgruppe"
                                valg={innsatsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="innsatsgruppe"
                                valg={innsatsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Hovedmål"
                    id="hovedmal"
                    hidden={erGjemHovedmalFeatureTogglePa}
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="hovedmal"
                                valg={hovedmal}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="hovedmal"
                                valg={hovedmal}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Formidlingsgruppe"
                    id="formidlingsgruppe"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="formidlingsgruppe"
                                valg={formidlingsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="formidlingsgruppe"
                                valg={formidlingsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Servicegruppe"
                    id="servicegruppe"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="servicegruppe"
                                valg={servicegruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="servicegruppe"
                                valg={servicegruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Manuell oppfølging"
                    id="manuell-oppfolging"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="manuellBrukerStatus"
                                valg={manuellBrukerStatus}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="manuellBrukerStatus"
                                valg={manuellBrukerStatus}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
            </div>
            <div className="col-sm-12 blokk-xs filtrering-filter__kolonne">
                <Element className="blokk-xxs">Rettighetsgruppe og ytelse</Element>
                <Dropdown
                    name="Rettighetsgruppe"
                    id="rettighetsgruppe"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="rettighetsgruppe"
                                valg={rettighetsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="rettighetsgruppe"
                                valg={rettighetsgruppe}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Ytelse"
                    id="ytelse"
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <RadioFilterform
                                valg={ytelse}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                form="ytelse"
                            />
                        ) : (
                            <GammelRadioFilterform
                                valg={ytelse}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                                form="ytelse"
                            />
                        )
                    }
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
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <AktivitetFilterform
                                valg={aktiviteter}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        ) : (
                            <GammelAktivitetFilterform
                                valg={aktiviteter}
                                filtervalg={filtervalg}
                                closeDropdown={lukkDropdown}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )
                    }
                />
                <Dropdown
                    name="Tiltakstype"
                    id="tiltakstype"
                    disabled={!(filtervalg.aktiviteter.TILTAK === 'JA')}
                    render={lukkDropdown =>
                        erLiveFiltreringFeatureTogglePa ? (
                            <CheckboxFilterform
                                form="tiltakstyper"
                                valg={enhettiltak}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                emptyCheckboxFilterFormMessage="Ingen tiltak funnet"
                                className="tiltakstyper"
                            />
                        ) : (
                            <GammelCheckboxFilterform
                                form="tiltakstyper"
                                valg={enhettiltak}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                closeDropdown={lukkDropdown}
                                emptyCheckboxFilterFormMessage="Ingen tiltak funnet"
                                className="tiltakstyper"
                            />
                        )
                    }
                />
            </div>
        </div>
    );
}

export default FiltreringFilter;
