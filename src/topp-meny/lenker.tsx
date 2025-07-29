import {NavLink} from 'react-router-dom';
import {useParams} from 'react-router';
import {useDispatch} from 'react-redux';
import {useIdentSelector} from '../hooks/redux/use-innlogget-ident';
import {useVeilederHarPortefolje} from '../hooks/portefolje/use-veileder-har-portefolje';
import {getSidestorrelseFromUrl} from '../utils/url-utils';
import {IdentParam} from '../model-interfaces';
import {fjernBrukerIKontekst} from '../ducks/bruker-i-kontekst';

interface Props {
    erPaloggetVeileder: boolean;
}

export function Lenker({erPaloggetVeileder}: Props) {
    const veilederIdent = useIdentSelector();
    const {ident} = useParams<IdentParam>();
    const harPortefolje = useVeilederHarPortefolje();
    const aktivLenkeKlasse = veilederIdent!.ident === ident || !ident ? 'oversiktslenke--valgt' : '';
    const dispatch = useDispatch();

    const erAktiv = id => {
        const elem = document.getElementById(id);
        if (elem) {
            return elem.className.includes('oversiktslenke typo-undertittel oversiktslenke--valgt');
        }
    };

    const sidestorrelse = getSidestorrelseFromUrl();

    return (
        <div className="oversikt-overskrifter" aria-label="Naviger mellom de forskjellige oversiktene.">
            <NavLink
                onClick={() => {
                    if (!window.location.pathname.startsWith('/portefolje')) {
                        dispatch(fjernBrukerIKontekst());
                    }
                }}
                to={{
                    pathname: '/portefolje',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
                className={({isActive}) => 'oversiktslenke typo-undertittel' + (isActive ? ` ${aktivLenkeKlasse}` : '')}
                id="min-oversikt"
                title="Her vises alle brukere som er tildelt deg"
                aria-label="Min oversikt"
                data-testid="min-oversikt"
                hidden={!(harPortefolje || erPaloggetVeileder)}
                aria-selected={erAktiv('min-oversikt')}
            >
                Min oversikt
            </NavLink>
            <NavLink
                onClick={() => {
                    if (!window.location.pathname.startsWith('/enhet')) {
                        dispatch(fjernBrukerIKontekst());
                    }
                }}
                to={{
                    pathname: '/enhet',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
                className={({isActive}) =>
                    'oversiktslenke typo-undertittel' + (isActive ? ' oversiktslenke--valgt' : '')
                }
                id="enhetens-oversikt"
                title="Her vises alle brukere som tilhører enheten"
                aria-label="Enhetens oversikt"
                data-testid="enhetens-oversikt"
                aria-selected={erAktiv('enhetens-oversikt')}
            >
                Enhetens oversikt
            </NavLink>
            <NavLink
                onClick={() => {
                    if (!window.location.pathname.startsWith('/veiledere')) {
                        dispatch(fjernBrukerIKontekst());
                    }
                }}
                to={{
                    pathname: '/veiledere',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
                className={({isActive}) =>
                    'oversiktslenke typo-undertittel' + (isActive ? ' oversiktslenke--valgt' : '')
                }
                title="Her vises alle veilederne som tilhører enheten"
                id="veileder-oversikt"
                aria-label="Veilederoversikt"
                data-testid="veileder-oversikt"
                aria-selected={erAktiv('veileder-oversikt')}
            >
                Veilederoversikt
            </NavLink>
        </div>
    );
}
