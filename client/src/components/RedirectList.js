import React, { Component } from 'react';

class RedirectList extends Component {
    renderRedirectList() {
        return this.props.lastMappings.map((mapping) => (
            <li
                className="collection-item"
                key={mapping._id}
                style={{ height: '40px' }}>
                <div className="left" style={{ marginRight: '40px' }}>
                    {new Date(mapping.created).toLocaleTimeString()}
                </div>
                <div className="left">
                    <a
                        href={mapping.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        {mapping.sourceUrl}
                    </a>
                </div>
                <div className="right">
                    <a
                        href={mapping.tinyUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        {mapping.tinyUrl}
                    </a>
                </div>
            </li>
        ));
    }

    render() {
        return (
            <ul className="collection with-header">
                <li className="collection-header">
                    <h4>Last 10 redirects</h4>
                </li>
                {this.renderRedirectList()}
            </ul>
        );
    }
}

export default RedirectList;
