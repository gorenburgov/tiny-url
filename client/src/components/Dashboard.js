import React, { Component } from 'react';
import { getTinyUrl, getSourceUrl } from '../services/tinyUrl';

class Dashboard extends Component {
    state = { sourceUrl: '', tinyUrl: '', pendingRequest: false, error: '' };

    handleSourceUrlChange(event) {
        this.setState({ sourceUrl: event.target.value });
    }

    handleSourceUrlSubmit(event) {
        event.preventDefault();
        this.makeUrlRequest('sourceUrl', 'tinyUrl');
    }

    handleTinyUrlChange(event) {
        this.setState({ tinyUrl: event.target.value });
    }

    handleTinyUrlSubmit(event) {
        event.preventDefault();
        this.makeUrlRequest('tinyUrl', 'sourceUrl');
    }

    async makeUrlRequest(inputField, outputField) {
        this.setState({ pendingRequest: true });
        const accessor = inputField === 'sourceUrl' ? getTinyUrl : getSourceUrl;
        try {
            const data = await accessor(this.state[inputField]);
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
                            name="source"
                            type="text"
                            value={this.state.sourceUrl}
                            onChange={(event) =>
                                this.handleSourceUrlChange(event)
                            }
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
                            name="source"
                            type="text"
                            value={this.state.tinyUrl}
                            onChange={(event) =>
                                this.handleTinyUrlChange(event)
                            }
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
            </div>
        );
    }
}

export default Dashboard;
