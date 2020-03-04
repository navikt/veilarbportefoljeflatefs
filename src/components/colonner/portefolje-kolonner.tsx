import {PropsWithChildren, default as React} from "react";

export function PortefoljeKolonner (props: PropsWithChildren<{}>) {
    return(
        <div className="col-lg-9 col-md-12 col-sm-12">
            {props.children}
        </div>
    )
}