import {ReactNode} from 'react';
import {Alert, Label, Link} from '@navikt/ds-react';
import {
    aapIArenaFilter,
    aapIKelvinFilter,
    alder,
    barnUnder18Aar,
    cvJobbprofil,
    dagpengerArenaFilter,
    dagpengerFilter,
    ensligeForsorgere,
    fodselsdagIMnd,
    formidlingsgruppe,
    gjeldendeVedtak14a,
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
import {OversiktType} from '../../ducks/ui/listevisning';
import {AktivitetFilterformController} from './filterform/aktiviteter-filterform/aktivitet-filterform-controller';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {GeografiskBostedFilterform} from './filterform/geografiskbosted-filterform';
import {FoedelandFilterform} from './filterform/foedeland-filterform';
import {TolkebehovFilterform} from './filterform/tolkebehov-filterform';
import {BarnUnder18FilterForm} from './filterform/barn-under-18-filterform';
import {CheckboxFilterform} from './filterform/checkbox-filterform';
import '../../components/sidebar/sidebar.css';
import '../filtrering-skjema.css';
import './filterform/filterform.css';
import {HendelserFilterform} from './filterform/hendelser-filterform';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {trackLenkeKlikketEvent} from '../../umami/umami-events';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {VIS_DAGPENGER_FRA_DPSAK} from '../../konstanter';

interface FiltreringFilterProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: ReactNode) => void;
    enhettiltak: any;
    oversiktType: OversiktType;
}

export function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak, oversiktType}: FiltreringFilterProps) {
    const visDagpengerFraDpsak = useFeatureSelector()(VIS_DAGPENGER_FRA_DPSAK);
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
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                <Link
                                    target="_blank"
                                    href={
                                        'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-oppflging-spesifikke-mlgrupper/SitePages/Språktolk.aspx'
                                    }
                                    onClick={() =>
                                        trackLenkeKlikketEvent({
                                            lenketekst: 'Bruk av språktolk i Nav'
                                        })
                                    }
                                >
                                    Bruk av språktolk i Nav.
                                    <ExternalLinkIcon title="Åpner lenke i ny fane" fontSize="1.2em" />
                                </Link>
                            </Alert>
                            <TolkebehovFilterform filtervalg={filtervalg} endreFiltervalg={endreFiltervalg} />
                        </>
                    )}
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
                                filtervalg={filtervalg}
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
                                filtervalg={filtervalg}
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
                                filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
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
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.servicegruppe,
                                    checkboxValg: servicegruppe
                                }
                            ]}
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
                            filterformOgValgListe={[
                                {
                                    form: Filtervalg.manuellBrukerStatus,
                                    checkboxValg: manuellBrukerStatus
                                }
                            ]}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
            <div className="filtrering-filter__kolonne">
                <Label size="small">Ytelse</Label>
                {!visDagpengerFraDpsak && (
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
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
                {visDagpengerFraDpsak && (
                    <Dropdown
                        name="Dagpenger"
                        id="ytelser-dappenger-alle"
                        render={() => (
                            <CheckboxFilterform
                                filterformOgValgListe={[
                                    {
                                        form: Filtervalg.ytelseDagpenger,
                                        checkboxValg: dagpengerFilter
                                    },
                                    {
                                        form: Filtervalg.ytelseDagpengerArena,
                                        checkboxValg: dagpengerArenaFilter
                                    }
                                ]}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                            />
                        )}
                    />
                )}
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
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
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
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
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
                            filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
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
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
        </div>
    );
}
