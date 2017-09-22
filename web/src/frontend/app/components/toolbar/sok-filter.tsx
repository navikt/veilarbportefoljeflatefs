import * as React from 'react';
import {Children, cloneElement} from 'react';
import { Input } from 'nav-frontend-skjema';

interface SokFilterProps {
    data: any[];
    filter?: (query: any) => any;
    children: React.ReactChild | React.ReactChildren;
    label: string;
    placeholder: string;
}

interface SokFilterState {
    query?: string;
}

const defaultFilter = (query) => (dataEntry) => !query || JSON.stringify(dataEntry).toLowerCase().includes(query.toLowerCase());

class SokFilter extends React.Component<SokFilterProps, SokFilterState> {
    constructor(props) {
        super(props);
        this.state = { query: undefined };
        this.changeQuery = this.changeQuery.bind(this);
    }

    changeQuery(e) {
        this.setState({ query: e.target.value });
    }

    render() {
        const { data, filter = defaultFilter, children, ...props } = this.props;
        const filteredData = data.filter(filter(this.state.query));
        const child = Children.map(children, (barn: React.ReactElement<any>) => cloneElement(barn, { ...props, data: filteredData }));
        return (
            <div>
                <div className="sokfilter">
                    <Input
                        label={this.props.label}
                        placeholder={this.props.placeholder}
                        value={this.state.query}
                        onChange={this.changeQuery}
                    />
                </div>
                {child}
            </div>
        );
    }
}

export default SokFilter;
