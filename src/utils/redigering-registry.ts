/**
 * Lettvekts modul-nivå teller som holder styr på om brukeren holder på med en redigeringng
 * Brukes for å utsette sideeffekter som kan rive brukeren ut av redigeringa - typisk oppdatering
 * av feature-toggles som hentes jevnlig.
 */

let antallAktiveRedigeringer = 0;

export function startRedigering(): void {
    antallAktiveRedigeringer++;
}

export function avsluttRedigering(): void {
    if (antallAktiveRedigeringer > 0) {
        antallAktiveRedigeringer--;
    }
}

export function erRedigeringAktiv(): boolean {
    return antallAktiveRedigeringer > 0;
}
