import classNames from 'classnames/dedupe';
import { EtikettLiten, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { default as React, Dispatch, SetStateAction } from 'react';
import { ReactComponent as LinkIcon } from './external-link.svg';
import Lenke from 'nav-frontend-lenker'; 
import { getTour } from './tour-modal-custom/tour-modal-custom';
import { default as TourModal, modalName } from '../tour-modal/tour-modal';


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
    modal: modalName;
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

function Modal(props: ModalStepperProps){
    return (
        <>
            <button onClick={()=>(props.setModalOpen(!props.modalOpen))}>
            Se hvordan
            </button>

            { props.modalOpen &&
                <TourModal 
                    steps={getTour(props.modal)} 
                    setModalOpen={props.setModalOpen}
                />
            }
        </>
    )
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
                    <Modal modal={props.modalProps.modal} setModalOpen={props.modalProps.setModalOpen} modalOpen={props.modalProps.modalOpen} />
                }
                    
            </div>

        </div>
    );
}
