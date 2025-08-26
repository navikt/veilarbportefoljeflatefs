export interface MoteplanModell {
    dato: string;
    varighetMinutter: number;
    deltaker: Deltaker;
    avtaltMedNav: boolean;
}

interface Deltaker {
    fornavn: string;
    etternavn: string;
    fnr: string;
}
