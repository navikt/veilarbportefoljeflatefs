import classNames from 'classnames/dedupe';
import { EtikettLiten, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { default as React, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { ReactComponent as LinkIcon } from './external-link.svg';
import Lenke from 'nav-frontend-lenker';
import { getTour } from '../tour-modal/tour-modal-custom/tour-modal-custom';
import { default as TourModal, ModalName } from '../tour-modal/tour-modal';
import { Knapp } from 'nav-frontend-knapper';

interface EndringsloggInnholdProps extends LinkInnholdProps {
    dato: string;
    innholdsTekst: string;
    innholdsOverskrift: string;
    nyeNotifikasjoner: boolean;
    modalProps?: ModalStepperProps;
}

interface LinkInnholdProps {
    url?: string;
    linkTekst?: string;
}

interface ModalStepperProps {
    modal: ModalName;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    modalOpen: boolean;
}

function LinkTag(props: LinkInnholdProps) {
    if (!props.url) {
        return null;
    }

    return (
        <Lenke className="endringslogg-link" target="_blank" href={props.url}>
            {props.linkTekst ? props.linkTekst : props.url}
            <LinkIcon/>
        </Lenke>

    );
}

function Modal(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);
    if (!props.modalOpen && open) {
        setOpen(false);
    }

    return (
        <>
            <Knapp className="endringslogg-stepperKnapp" mini={true} onClick={() => {
                props.setModalOpen(!props.modalOpen);
                setOpen(!open);
            }}>
                Se hvordan
            </Knapp>
            {open &&
            <TourModal
                checkLocalStorage={false}
                modalName={props.modal}
                setModalOpen={props.setModalOpen}
            />
            }
        </>
    );
}

export default function EndringsloggInnhold(props: EndringsloggInnholdProps) {

    return (
        <div className="endringslogg-rad endringslogg-skille">
            <div className="endringslogg-datolinje">
                <div role={props.nyeNotifikasjoner ? 'alert' : ''}
                     aria-label={props.nyeNotifikasjoner ? 'Nye endringer i Arbeidsrettet oppfølging' : ''}
                     className={classNames('endringslogg-info-kolonne', {
                         'endringslogg-info-nye-notifikasjoner ': props.nyeNotifikasjoner
                     })}/>
                <EtikettLiten>{props.dato}</EtikettLiten>
            </div>
            <div className="endringslogg-innhold endringslogg-kolonne">
                <Undertittel tag="h3"> {props.innholdsOverskrift} </Undertittel>
                <Normaltekst> {props.innholdsTekst} </Normaltekst>
                <LinkTag url={props.url} linkTekst={props.linkTekst}/>
                {props.modalProps &&
                <Modal modal={props.modalProps.modal} setModalOpen={props.modalProps.setModalOpen}
                       modalOpen={props.modalProps.modalOpen}/>
                }

            </div>
        </div>
    );
}
