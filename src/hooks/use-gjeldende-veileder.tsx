import {useParams} from "react-router";
import {useIdentSelector} from "./redux/use-inlogget-ident";

export function useGjeldendeVeileder() {
    const {ident} = useParams();
    const inloggetVeileder = useIdentSelector();
    return ident ? ident : inloggetVeileder!.ident;
}