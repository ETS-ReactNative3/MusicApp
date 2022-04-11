import {ADD_TO_FAVS,REMOVE_FAVS} from '../ActionTypes';
import {store} from '../../store';
import Api from '../../config/Api';
import {SearchMusic} from '../../config/Urls';

export function postData(data) {
  return Api('POST', SearchMusic + data).then(res => {
    return res;
  });
}

export function addToFavourites(data) {
  store.dispatch({
    type: ADD_TO_FAVS,
    payload: data,
  });
}

export function removeFromFavourites(data) {
  store.dispatch({
    type: REMOVE_FAVS,
    payload: data,
  });
}