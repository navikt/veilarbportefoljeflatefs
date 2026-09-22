/**
 * Lettvekts modul-nivå teller som holder styr på om brukeren holder på med en redigeringng
 * Brukes for å utsette sideeffekter som kan rive brukeren ut av redigeringa - typisk oppdatering
 * av feature-toggles som hentes jevnlig.
 */

let antallAktiveRedigeringar = 0;

export function startRedigering(): void {
    antallAktiveRedigeringar++;
}

export function avsluttRedigering(): void {
    if (antallAktiveRedigeringar > 0) {
        antallAktiveRedigeringar--;
    }
}

export function erRedigeringAktiv(): boolean {
    return antallAktiveRedigeringar > 0;
}
