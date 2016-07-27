import React from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import QuestionContainer from './containers/Question';
import configureStore from './store/configureStore';
import Intro from './containers/Intro';
import Error from './containers/Error';
import './scss/main.scss';

const store = configureStore();

function getBaseName() {
    let baseUri = document.baseURI || document.getElementsByTagName('base')[0].href;
    return baseUri.endsWith('research/') ? '/research' : '/';
}

const browserHistory = useRouterHistory(createHistory)({
    basename: getBaseName()
});

var NoMatch = React.createClass({
    render(){
        return (
            <div className="error-page">The page you are looking for is absent.</div>
        );
    }
});

var Questions = React.createClass({
    render(){
        var dataWrapper = document.getElementById('acisWrapper');
        return(
            <Provider store={store}>
                <QuestionContainer
                    sampleId={dataWrapper.dataset.sampleid}
                    gatewayUrl={dataWrapper.dataset.gatewayurl}
                    authToken={dataWrapper.dataset.authtoken}
                />
            </Provider>
        );
    }
});

var IntroPage = React.createClass({
    render(){
        var dataWrapper = document.getElementById('acisWrapper');
        return(
            <Provider store={store}>
                <Intro
                    sampleId={dataWrapper.dataset.sampleid}
                    gatewayUrl={dataWrapper.dataset.gatewayUrl}
                    authToken={dataWrapper.dataset.authToken}
                />
            </Provider>
        );
    }
});

const App = React.createClass({
    render () {
        let dataWrapper = document.getElementById('acisWrapper');
        if (!dataWrapper.dataset.sampleid) {
            return(
                <Provider store={store}>
                    <Error
                      sampleId={dataWrapper.dataset.sampleid}
                    />
                </Provider>
            );
        }
        return this.props.children;
    }
});

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/:sampleId/questions" component={Questions}/>
            <Route path="/:sampleId" component={IntroPage}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
