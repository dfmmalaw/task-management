import { SET_LOADING, CLEAR_LOADING } from '../constants';

const initialState = {
	loader: false,
};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				loader: true,
			};
		case CLEAR_LOADING:
			return {
				loader: false,
			};
		default:
			return state;
	}
};

export default loadingReducer;