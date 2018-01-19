import { CHANGE_ROUTE } from '../constants/ActionTypes';
import { compileHash, parseRoute } from '../utils/RouterUtils';

export const navigateTo = (route) => {
  return {
    type: CHANGE_ROUTE,
    route,
  };
};

export const navigateBack = e => (dispatch) => {
  const { state } = e;
  if (state) {
    const { route } = state;
    dispatch(navigateTo(route));
  }
};

export const initRouter = paths => (dispatch) => {
  window.onpopstate = (e) => {
    dispatch(navigateBack(e));
  };

  const route = {path: '', key: {}, options: {}}; 
  return dispatch(navigateTo(route));
};