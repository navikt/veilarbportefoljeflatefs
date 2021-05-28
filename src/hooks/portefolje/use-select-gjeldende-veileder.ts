import {useParams} from 'react-router';
import {useIdentSelector} from '../redux/use-innlogget-ident';

export function useSelectGjeldendeVeileder() {
    const {ident} = useParams();
    const innloggetVeilederIdent = useIdentSelector();

    return ident ? ident : innloggetVeilederIdent!.ident;
}
