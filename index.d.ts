import * as React from 'react';

interface DefaultProps {
    rayToken?:string;
    domain?:string;
    debug?:boolean;
}

declare class Help extends React.Component<DefaultProps> {
    // @ts-ignore
    render(): JSX.Element;
}

export default Help;
