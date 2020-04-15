import React, { Component } from 'react';
import { getTinyUrl, getSourceUrl, getLast } from '../services/tinyUrl';
import urlValidator from '../services/urlValidator';
import protocolAppender from '../services/protocolAppender';
import RedirectList from './RedirectList';

class Dashboard extends Component {
    state = {
        sourceUrl: '',
        tinyUrl: '',
        pendingRequest: false,
        error: '',
        lastMappings: [],
    };

    componentDidMount() {
        getLast().then((result) => {
            console.log(result.data);
            this.setState({ lastMappings: result.data });
        });
    }

    componentDidUpdate() {
        getLast().then((result) => {
            this.setState({ lastMappings: result.data });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSourceUrlSubmit(event) {
        event.preventDefault();
        this.makeUrlRequest('sourceUrl', 'tinyUrl');
    }

    handleTinyUrlSubmit(event) {
        event.preventDefault();
        this.makeUrlRequest('tinyUrl', 'sourceUrl');
    }

    async makeUrlRequest(inputField, outputField) {
        if (!urlValidator(this.state[inputField])) {
            this.setState({
                [inputField + 'InputError']: 'Invalid ' + inputField + ' value',
            });
            return;
        }

        this.setState({ pendingRequest: true });
        const accessor = inputField === 'sourceUrl' ? getTinyUrl : getSourceUrl;
        try {
            const inputFieldValue = protocolAppender(this.state[inputField]);
            this.setState({
                [inputField]: inputFieldValue,
            });
            const data = await accessor(inputFieldValue);
            const payload = data.data;
            console.log(data);
            if (payload.error) {
                this.setState({
                    [inputField + 'InputError']: payload.error,
                });
                return;
            }
            this.setState({
                [outputField]: payload[outputField],
                [outputField + 'InputError']: '',
                [inputField + 'InputError']: '',
            });
        } catch (err) {
            this.setState({
                [inputField + 'InputError']: err.response.data.error,
            });
        } finally {
            this.setState({ pendingRequest: false });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSourceUrlSubmit(event)}>
                    <label>
                        Input your full url here:
                        <input
                            name="sourceUrl"
                            type="text"
                            value={this.state.sourceUrl}
                            onChange={(event) => this.handleInputChange(event)}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={this.state.pendingRequest}
                        className="waves-effect waves-light btn-small">
                        Get tiny url
                    </button>
                    <a
                        className="waves-effect waves-light btn-small right"
                        disabled={this.state.pendingRequest}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={this.state.sourceUrl}>
                        Browse this source url
                    </a>
                </form>
                <div className="red-text" style={{ marginBottom: '20px' }}>
                    {this.state.sourceUrlInputError}
                </div>
                <form onSubmit={(event) => this.handleTinyUrlSubmit(event)}>
                    <label>
                        Your tiny url is:
                        <input
                            name="tinyUrl"
                            type="text"
                            value={this.state.tinyUrl}
                            onChange={(event) => this.handleInputChange(event)}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={this.state.pendingRequest}
                        className="waves-effect waves-light btn-small">
                        Get source url
                    </button>
                    <a
                        className="waves-effect waves-light btn-small right"
                        target="_blank"
                        href={this.state.tinyUrl}
                        rel="noopener noreferrer"
                        disabled={this.state.pendingRequest}>
                        Browse this tiny url
                    </a>
                </form>
                <div className="red-text" style={{ marginBottom: '20px' }}>
                    {this.state.tinyUrlInputError}
                </div>
                <RedirectList lastMappings={this.state.lastMappings} />
            </div>
        );
    }
}

export default Dashboard;
