import {useParams} from 'react-router';
import {IdentParam} from '../../model-interfaces';
import {useIdentSelector} from '../redux/use-innlogget-ident';

export function useSelectGjeldendeVeileder() {
    const {ident} = useParams<IdentParam>();
    const innloggetVeilederIdent = useIdentSelector();

    return ident || innloggetVeilederIdent!.ident;
}
