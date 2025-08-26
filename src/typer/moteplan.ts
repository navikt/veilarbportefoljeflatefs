export interface MoteData {
    dato: string;
    deltaker: Deltaker;
    avtaltMedNav: boolean;
}

interface Deltaker {
    fornavn: string;
    etternavn: string;
    fnr: string;
}
