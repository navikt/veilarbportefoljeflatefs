import * as React from 'react';
import groq from 'groq';

export const groqStepperPreviewFields = `
  tittel,
  knappetekst,
  steg1Tittel,
  steg1Innhold,
  steg1Bilde,
  steg1AltTekst,
  steg2Tittel,
  steg2Innhold,
  steg2Bilde,
  steg2AltTekst,
  steg3Tittel,
  steg3Innhold,
  steg3Bilde,
  steg3AltTekst,
  _createdAt,
  _id
`;

export const query = groq`
*[_type == "stepper"] | order(dato desc) {
  ${groqStepperPreviewFields}
}
`;

export type SanityImageI = {altTekst?: string; caption?: string};

export type StepperData = {
    tittel: string;
    knappetekst?: string;
    steg1Tittel: string;
    steg1Innhold: string;
    steg1Bilde: SanityImageI;
    steg1AltTekst: string;
    steg2Tittel: string;
    steg2Innhold: string;
    steg2Bilde: SanityImageI;
    steg2AltTekst: string;
    steg3Tittel: string;
    steg3Innhold: string;
    steg3Bilde: SanityImageI;
    steg3AltTekst: string;
    _createdAt: string;
    _id: string;
};
