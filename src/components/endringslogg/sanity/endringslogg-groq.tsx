import groq from 'groq';
import {ModalName} from '../../modal/sanity-tour-modal/sanity_tour-modal';

export const groqEndringsloggPreviewFields = `
  tittel,
  dato,
  innhold,
  lenke,
  stepper,
  _createdAt,
  _id
`;

export const query = groq`
*[_type == "endringsloggmelding"] | order(dato desc) {
  ${groqEndringsloggPreviewFields}
}
`;

export type EndringsloggData = {
    tittel: string;
    dato: Date;
    innhold: string;
    lenke?: string;
    stepper?: Array<ModalName>;
    _createdAt: string;
    _id: string;
};
