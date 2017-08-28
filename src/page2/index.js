import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppStore from './reducers/index';
import App from './comp/app'
import {AppContainer} from 'react-hot-loader'
import './css/index.scss'
//创建store
let store = createStore(AppStore)
/*ReactDom.render(
    <AppContainer>
        <Provider store={store}>
            <App/>
        </Provider>
    </AppContainer>,
    document.getElementById('box')
);*/
const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('box')
    );
}
render(App)
if (module.hot) {
    module.hot.accept('./comp/app', () => { render(App) })
}