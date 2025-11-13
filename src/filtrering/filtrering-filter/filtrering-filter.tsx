import {ReactNode} from 'react';
import {Alert, Label, Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {
    aapIArenaFilter,
    aapIKelvinFilter,
    alder,
    avvik14aVedtak,
    avvik14aVedtakAvhengigeFilter,
    barnUnder18Aar,
    cvJobbprofil,
    dagpengerArenaFilter,
    ensligeForsorgere,
    fodselsdagIMnd,
    formidlingsgruppe,
    gjeldendeVedtak14a,
    HAR_AVVIK,
    hovedmalGjeldendeVedtak14a,
    innsatsgruppeGjeldendeVedtak14a,
    kjonn,
    manuellBrukerStatus,
    registreringstype,
    rettighetsgruppeArena,
    servicegruppe,
    stillingFraNavFilter,
    tiltakspengerFilter,
    tiltakspengerFilterArena,
    utdanning,
    utdanningBestatt,
    utdanningGodkjent
} from '../filter-konstanter';
import {Dropdown} from '../../components/dropdown/dropdown';
import {FodselsdatoFilterform} from './filterform/fodselsdato-filterform';
import {AlderFilterform} from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import {HendelserFilterform} from './filterform/hendelser-filterform';
import {OversiktType} from '../../ducks/ui/listevisning';
import {AktivitetFilterformController} from './filterform/aktiviteter-filterform/aktivitet-filterform-controller';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {GeografiskBostedFilterform} from './filterform/geografiskbosted-filterform';
import {FoedelandFilterform} from './filterform/foedeland-filterform';
import {TolkebehovFilterform} from './filterform/tolkebehov-filterform';
import {BarnUnder18FilterForm} from './filterform/barn-under-18-filterform';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {
    SKJUL_FILTER_SAMMENLIGNE_GJELDENDE_14A_OG_ARENA,
    VIS_AAPFILTER_MED_KELVINDATA,
    VIS_TILTAKSPENGER_MED_TPSAKDATA,
    VIS_YTELSER_I_SEPARATE_DROPDOWNS
} from '../../konstanter';
import {YtelserMedNyttAapArenaFilterRadioFilterform} from './filterform/ytelser-med-nytt-aap-arena-filter-radio-filterform';
import '../../components/sidebar/sidebar.css';
import '../filtrering-skjema.css';
import './filterform/filterform.css';
import {CheckboxFilterform} from './filterform/checkbox-filterform';

interface FiltreringFilterProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: ReactNode) => void;
    enhettiltak: any;
    oversiktType: OversiktType;
}

type FilterEndring = 'FJERNET' | 'LAGT_TIL' | 'UENDRET';

export function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak, oversiktType}: FiltreringFilterProps) {
    const skalViseAAPfilterMedKelvindata = useFeatureSelector()(VIS_AAPFILTER_MED_KELVINDATA);
    const skjulSammenlignGjeldende14aOgArenaVedtakFilter = useFeatureSelector()(
        SKJUL_FILTER_SAMMENLIGNE_GJELDENDE_14A_OG_ARENA
    );
    const skalViseTiltakspengerfilterMedTPSAKdata = useFeatureSelector()(VIS_TILTAKSPENGER_MED_TPSAKDATA);
    const skalViseYtelserISeparateDropdowns = useFeatureSelector()(VIS_YTELSER_I_SEPARATE_DROPDOWNS);

    const avvik14aVedtakValg = () => {
        const erIndeterminate = () => {
            return () => {
                const {HAR_AVVIK, ...avhengigeFilter} = avvik14aVedtak;

                const valgteAvhengigeFilter = filtervalg.avvik14aVedtak.filter(valgtFilter =>
                    Object.keys(avhengigeFilter).includes(valgtFilter)
                );

                return (
                    valgteAvhengigeFilter.length > 0 &&
                    valgteAvhengigeFilter.length < Object.keys(avhengigeFilter).length
                );
            };
        };

        return {
            ...avvik14aVedtak,
            [HAR_AVVIK]: {
                ...avvik14aVedtak.HAR_AVVIK,
                indeterminate: erIndeterminate()
            }
        };
    };

    const filterEndring = (filterNavn: string, forrigeFilter: string[], nyeFilter: string[]): FilterEndring => {
        if (forrigeFilter.includes(filterNavn) && !nyeFilter.includes(filterNavn)) {
            return 'FJERNET';
        }

        if (!forrigeFilter.includes(filterNavn) && nyeFilter.includes(filterNavn)) {
            return 'LAGT_TIL';
        }

        return 'UENDRET';
    };

    const endreAvvik14aVedtakFilterValg = () => {
        return (form: string, filterVerdi: string[]) => {
            const filterForEndring: string[] = filtervalg.avvik14aVedtak;
            const filterEtterEndring: string[] = filterVerdi;

            const hovedfilterEndring: FilterEndring = filterEndring(HAR_AVVIK, filterForEndring, filterEtterEndring);

            if (hovedfilterEndring === 'FJERNET') {
                return endreFiltervalg(form, []);
            }

            if (hovedfilterEndring === 'LAGT_TIL') {
                return endreFiltervalg(form, Object.keys(avvik14aVedtak));
            }

            const ingenAvhengigeFilterValgt: boolean = !filterEtterEndring.some(f =>
                Object.keys(avvik14aVedtakAvhengigeFilter).includes(f)
            );

            if (ingenAvhengigeFilterValgt) {
                return endreFiltervalg(form, []);
            }

            return endreFiltervalg(form, filterVerdi.includes(HAR_AVVIK) ? filterVerdi : [HAR_AVVIK, ...filterVerdi]);
        };
    };

    return (
        <div className="filtrering-filter filtrering-filter__kolonne" data-testid="filtrering-filter_container">
            <div className="filtrering-filter__kolonne">
                <Label size="small">Om personen</Label>
                <Dropdown
                    name="Alder"
                    id="alder"
                    render={lukkDropdown => (
                        <AlderFilterform
                            form={Filtervalg.alder}
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
                            form={Filtervalg.fodselsdagIMnd}
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
                            form={Filtervalg.kjonn}
                            gridColumns={2}
                        />
                    )}
                />
                <Dropdown
                    name="Har barn under 18 år"
                    id="barnUnder18"
                    render={lukkDropdown => (
                        <BarnUnder18FilterForm
                            valg={barnUnder18Aar}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                        />
                    )}
                />
                <Dropdown
                    name="Geografisk bosted"
                    id="bosted"
                    render={() => (
                        <GeografiskBostedFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
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
                            form={Filtervalg.sisteEndringKategori}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            endreCheckboxFiltervalg={endreFiltervalg}
                            oversiktType={oversiktType}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label>Siste svar fra registrering i Arbeidssøkerregisteret</Label>
                <Dropdown
                    name="Situasjon"
                    id="situasjon"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
                            </Alert>
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.registreringstype,
                                        checkboxValg: registreringstype
                                    }
                                ]}
                                filtervalgModell={filtervalg}
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
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
                            </Alert>
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.utdanning,
                                        checkboxValg: utdanning
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Er utdanningen godkjent"
                    id="er-utdanningen-godkjent"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
                            </Alert>
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.utdanningGodkjent,
                                        checkboxValg: utdanningGodkjent
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        </>
                    )}
                />
                <Dropdown
                    name="Er utdanningen bestått"
                    id="er-utdanningen-bestatt"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
                            </Alert>
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.utdanningBestatt,
                                        checkboxValg: utdanningBestatt
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        </>
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Oppfølgingsvedtak § 14 a</Label>
                <Dropdown
                    name="Gjeldende vedtak § 14 a"
                    id="gjeldende-vedtak-14a"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.gjeldendeVedtak14a,
                                    checkboxValg: gjeldendeVedtak14a
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Innsatsgruppe"
                    id="innsatsgruppe-gjeldende-vedtak-14a"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.innsatsgruppeGjeldendeVedtak14a,
                                    checkboxValg: innsatsgruppeGjeldendeVedtak14a
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Hovedmål"
                    id="hovedmal-gjeldende-vedtak-14a"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.hovedmalGjeldendeVedtak14a,
                                    checkboxValg: hovedmalGjeldendeVedtak14a
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                {!skjulSammenlignGjeldende14aOgArenaVedtakFilter && (
                    <Dropdown
                        name="Sammenlign gjeldende vedtak og Arena"
                        id="status-14a-vedtak-filter"
                        render={() => (
                            <>
                                <Alert variant="info" size="small" className="registrering-alert">
                                    Filteret viser brukere der hovedmål/innsatsgruppe i Arena er ulikt det gjeldende §
                                    14 a-vedtaket.{' '}
                                    <Link
                                        href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Ulike-hovedm%C3%A5l-og-innsatsgruppe-i-Arena,-og-i-iverksatte-%C2%A7-14-a-vedtak(1).aspx"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        Se mer informasjon på Navet
                                        <ExternalLinkIcon title="Åpne lenken i ny fane" fontSize="1.2em" />
                                    </Link>
                                </Alert>
                                <CheckboxFilterform
                                    filterformOgValgListe={[
                                        {
                                            form: Filtervalg.avvik14aVedtak,
                                            checkboxValg: avvik14aVedtakValg()
                                        }
                                    ]}
                                    filtervalgModell={filtervalg}
                                    endreFiltervalg={endreAvvik14aVedtakFilterValg()}
                                />
                            </>
                        )}
                    />
                )}
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
                            form={Filtervalg.cvJobbprofil}
                        />
                    )}
                />
                <Dropdown
                    name="Formidlingsgruppe"
                    id="formidlingsgruppe"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.formidlingsgruppe,
                                    checkboxValg: formidlingsgruppe
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Servicegruppe"
                    id="servicegruppe"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.servicegruppe,
                                    checkboxValg: servicegruppe
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Manuell oppfølging"
                    id="manuell-oppfolging"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.manuellBrukerStatus,
                                    checkboxValg: manuellBrukerStatus
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Ytelse</Label>
                {!skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="Dagpenger, AAP og tiltakspenger (Arena)"
                        id="ytelse"
                        render={() => (
                            <YtelserMedNyttAapArenaFilterRadioFilterform
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="Dagpenger"
                        id="ytelse-dagpenger"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseDagpengerArena,
                                        checkboxValg: dagpengerArenaFilter
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {skalViseAAPfilterMedKelvindata && skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="AAP"
                        id="ytelser-aap-i-kelvin-og-arena"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseAapKelvin,
                                        checkboxValg: aapIKelvinFilter
                                    },
                                    {
                                        form: Filtervalg.ytelseAapArena,
                                        checkboxValg: aapIArenaFilter
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {skalViseAAPfilterMedKelvindata && !skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="AAP (Kelvin)"
                        id="ytelser-aap-utenfor-arena"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseAapKelvin,
                                        checkboxValg: aapIKelvinFilter
                                    },
                                    {
                                        form: Filtervalg.ytelseAapArena,
                                        checkboxValg: aapIArenaFilter
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {skalViseTiltakspengerfilterMedTPSAKdata && skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="Tiltakspenger"
                        id="ytelser-tiltakspenger-alle"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseTiltakspenger,
                                        checkboxValg: tiltakspengerFilter
                                    },
                                    {
                                        form: Filtervalg.ytelseTiltakspengerArena,
                                        checkboxValg: tiltakspengerFilterArena
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {skalViseTiltakspengerfilterMedTPSAKdata && !skalViseYtelserISeparateDropdowns && (
                    <Dropdown
                        name="Tiltakspenger (TPSAK)"
                        id="ytelser-tiltakspenger-tpsak"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseTiltakspenger,
                                        checkboxValg: tiltakspengerFilter
                                    }
                                ]}
                                filtervalgModell={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                <Dropdown
                    name="Enslige forsørgere"
                    id="ensligeForsorgere"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.ensligeForsorgere,
                                    checkboxValg: ensligeForsorgere
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Rettighetsgruppe (Arena)"
                    id="rettighetsgruppe"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.rettighetsgruppe,
                                    checkboxValg: rettighetsgruppeArena
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Aktivitet</Label>
                <Dropdown
                    name="Aktivitet (avtalt med Nav)"
                    id="aktivitet"
                    render={() => (
                        <AktivitetFilterformController filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                    )}
                />
                <Dropdown
                    name="Tiltakstype (avtalt med Nav)"
                    id="tiltakstype"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[{form: Filtervalg.tiltakstyper, checkboxValg: enhettiltak}]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                            emptyCheckboxFilterFormMessage="Ingen tiltak funnet"
                            className="tiltakstyper"
                        />
                    )}
                />
                <Dropdown
                    name="Stilling fra Nav (dele CV med arbeidsgiver)"
                    id="stillingFraNav"
                    render={() => (
                        <CheckboxFilterform
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.stillingFraNavFilter,
                                    checkboxValg: stillingFraNavFilter
                                }
                            ]}
                            filtervalgModell={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
        </div>
    );
}
