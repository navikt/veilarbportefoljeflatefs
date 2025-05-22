import {FargekategoriModell, HuskelappModell} from '../../../typer/bruker-modell';

interface SjekkOmNoeSkalSlettesProps {
    tilVeileder: string;
    fraVeileder: string | undefined;
    tilEnhet: string | null;
}

interface SjekkOmHuskelappSkalSlettesProps extends SjekkOmNoeSkalSlettesProps {
    huskelapp: HuskelappModell | undefined;
}

export const harHuskelappSomVilBliSlettetFilter = ({
    tilVeileder,
    fraVeileder,
    tilEnhet,
    huskelapp
}: SjekkOmHuskelappSkalSlettesProps) => {
    return (
        !!huskelapp &&
        (fraVeileder !== tilVeileder || fraVeileder === null) &&
        huskelapp.enhetId !== null &&
        huskelapp.enhetId !== tilEnhet
    );
};

interface SjekkOmFargekategoriSkalSlettesProps extends SjekkOmNoeSkalSlettesProps {
    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
}

export const harFargekategoriSomVilBliSlettetFilter = ({
    tilVeileder,
    fraVeileder,
    tilEnhet,
    fargekategori,
    fargekategoriEnhetId
}: SjekkOmFargekategoriSkalSlettesProps) => {
    return (
        fargekategori &&
        (fraVeileder !== tilVeileder || fraVeileder === null) &&
        fargekategoriEnhetId !== null &&
        fargekategoriEnhetId !== tilEnhet
    );
};

interface SjekkOmIngentingSkalSlettesProps
    extends SjekkOmHuskelappSkalSlettesProps,
        SjekkOmFargekategoriSkalSlettesProps {}

export const ingentingHosBrukerVilBliSlettet = ({
    tilVeileder,
    fraVeileder,
    tilEnhet,
    huskelapp,
    fargekategori,
    fargekategoriEnhetId
}: SjekkOmIngentingSkalSlettesProps) => {
    return (
        fraVeileder === tilVeileder ||
        ((!huskelapp || huskelapp?.enhetId === tilEnhet) && (!fargekategori || fargekategoriEnhetId === tilEnhet))
    );
};
