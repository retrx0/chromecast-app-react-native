import createDataContext from "./createDataContext";

const reducer = (state, action) => {
    switch (action.type) {
        case 'senduri':
            return {...state, uri: action.payload}
        default:
            return state;
    }
}

const sendUri = dispatch => (uri) => {
    return () => {
       dispatch({type: 'senduri', payload: uri});
    };
};


export const {Context, Provider} = createDataContext(reducer, {sendUri}, {uri: 'http://www.google.com'});