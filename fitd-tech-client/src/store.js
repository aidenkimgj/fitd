import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas/index';

const store = () => {
	const sagaMiddleware = createSagaMiddleware();
	return {
		...createStore(
			rootReducer,
			composeWithDevTools(applyMiddleware(sagaMiddleware))
		),
		runSaga: sagaMiddleware.run(rootSaga),
	};
};

export default store;
