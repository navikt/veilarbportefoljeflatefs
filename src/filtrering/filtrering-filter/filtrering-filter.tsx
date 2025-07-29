import {ReactNode} from 'react';
import {Alert, Label, Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {CheckboxFilterform} from './filterform/checkbox-filterform';
import {
    alder,
    avvik14aVedtak,
    avvik14aVedtakAvhengigeFilter,
    barnUnder18Aar,
    cvJobbprofil,
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
    rettighetsgruppe,
    servicegruppe,
    stillingFraNavFilter,
    utdanning,
    utdanningBestatt,
    utdanningGodkjent,
    ytelse
} from '../filter-konstanter';
import {Dropdown} from '../../components/dropdown/dropdown';
import {FodselsdatoFilterform} from './filterform/fodselsdato-filterform';
import {AlderFilterform} from './filterform/alder-filterform';
import {RadioFilterform} from './filterform/radio-filterform';
import {HendelserFilterform} from './filterform/hendelser-filterform';
import {OversiktType} from '../../ducks/ui/listevisning';
import {AktivitetFilterformController} from './filterform/aktiviteter-filterform/aktivitet-filterform-controller';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {GeografiskBostedFilterform} from './filterform/geografiskbosted-filterform';
import {FoedelandFilterform} from './filterform/foedeland-filterform';
import {TolkebehovFilterform} from './filterform/tolkebehov-filterform';
import {BarnUnder18FilterForm} from './filterform/barn-under-18-filterform';
import '../../components/sidebar/sidebar.css';
import '../filtrering-skjema.css';
import './filterform/filterform.css';

interface FiltreringFilterProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: ReactNode) => void;
    enhettiltak: any;
    oversiktType: OversiktType;
}

type FilterEndring = 'FJERNET' | 'LAGT_TIL' | 'UENDRET';

export function FiltreringFilter({filtervalg, endreFiltervalg, enhettiltak, oversiktType}: FiltreringFilterProps) {
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
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
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
                    name="Er utdanningen godkjent"
                    id="er-utdanningen-godkjent"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Siste svar bruker oppga via arbeidssøkerregistreringen. Det finnes ikke svar for alle,
                                f.eks. sykmeldte.
                            </Alert>
                            <CheckboxFilterform
                                form="utdanningGodkjent"
                                valg={utdanningGodkjent}
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
                                form="utdanningBestatt"
                                valg={utdanningBestatt}
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
                            form="gjeldendeVedtak14a"
                            valg={gjeldendeVedtak14a}
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
                            form="innsatsgruppeGjeldendeVedtak14a"
                            valg={innsatsgruppeGjeldendeVedtak14a}
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
                            form="hovedmalGjeldendeVedtak14a"
                            valg={hovedmalGjeldendeVedtak14a}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
                <Dropdown
                    name="Sammenlign gjeldende vedtak og Arena"
                    id="status-14a-vedtak-filter"
                    render={() => (
                        <>
                            <Alert variant="info" size="small" className="registrering-alert">
                                Filteret viser brukere der hovedmål/innsatsgruppe i Arena er ulikt det gjeldende § 14
                                a-vedtaket.{' '}
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
                                form="avvik14aVedtak"
                                valg={avvik14aVedtakValg()}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreAvvik14aVedtakFilterValg()}
                            />
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
                            valg={manuellBrukerStatus}
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
                    name="Dagpenger, AAP og tiltakspenger"
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
                <Dropdown
                    name="Enslige forsørgere"
                    id="ensligeForsorgere"
                    render={() => (
                        <CheckboxFilterform
                            form="ensligeForsorgere"
                            valg={ensligeForsorgere}
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
                            form="tiltakstyper"
                            valg={enhettiltak}
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
                            form="stillingFraNavFilter"
                            valg={stillingFraNavFilter}
                            filtervalg={filtervalg}
                            endreFiltervalg={endreFiltervalg}
                        />
                    )}
                />
            </div>
        </div>
    );
}
