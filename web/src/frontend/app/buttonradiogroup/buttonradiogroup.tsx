import * as React from 'react';

interface ButtonRadiogroupProps {
    visningsmodus: string
}

export default class ButtonRadiogroup extends React.Component<ButtonRadiogroupProps, {}> {
    render() {
        const { visningsmodus } = this.props;
        return (
            <span>
                <input
                    id="diagramvisning"
                    name="visningsmodus"
                    type="radio"
                    onClick={() => console.log("diagram!")}
                    value="diagramvisnings"
                />
                <label htmlFor="diagramvisning">Vis som diagram</label>
                <input
                    id="tabellvisning"
                    name="visningsmodus"
                    type="radio"
                    onClick={() => console.log("tabell!")}
                    defaultChecked={true}
                    value="tabellvisning"
                />
                <label htmlFor="tabellvisning">Vis som tabell</label>
            </span>
        );
    }
}
