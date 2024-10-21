import {FargekategoriModell, HuskelappModell} from '../../../model-interfaces';

interface SjekkOmNoeSkalSlettesProps {
    tilVeileder: string;
    fraVeileder: string | undefined;
    tilEnhet: string | null;
}

interface SjekkOmArebeidslisteSkalSlettesProps extends SjekkOmNoeSkalSlettesProps {
    arbeidslisteAktiv: boolean;
    navkontorForArbeidsliste: string | undefined;
}

export const harArbeidslisteSomVilBliSlettetFilter = ({
    tilVeileder,
    fraVeileder,
    tilEnhet,
    arbeidslisteAktiv,
    navkontorForArbeidsliste
}: SjekkOmArebeidslisteSkalSlettesProps): boolean => {
    return (
        arbeidslisteAktiv &&
        (fraVeileder !== tilVeileder || fraVeileder === null) &&
        navkontorForArbeidsliste !== null &&
        navkontorForArbeidsliste !== tilEnhet
    );
};

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
    extends SjekkOmArebeidslisteSkalSlettesProps,
        SjekkOmHuskelappSkalSlettesProps,
        SjekkOmFargekategoriSkalSlettesProps {}

export const ingentingHosBrukerVilBliSlettet = ({
    tilVeileder,
    fraVeileder,
    tilEnhet,
    arbeidslisteAktiv,
    navkontorForArbeidsliste,
    huskelapp,
    fargekategori,
    fargekategoriEnhetId
}: SjekkOmIngentingSkalSlettesProps) => {
    return (
        fraVeileder === tilVeileder ||
        (!arbeidslisteAktiv &&
            (!huskelapp || huskelapp?.enhetId === tilEnhet) &&
            (!fargekategori || fargekategoriEnhetId === tilEnhet))
    );
};
