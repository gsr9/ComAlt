import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
    let store = createStore(Reducers, applyMiddleware(thunk))
    return store
}

export default  configureStore;