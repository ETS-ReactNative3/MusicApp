import { ADD_TO_FAVS, REMOVE_FAVS } from '../ActionTypes';

let initialState = {
    musicFiles:[]
};
const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVS:
            let tempdata = state.musicFiles
            let obj = action?.payload
            tempdata.push(obj)
            return {musicFiles:tempdata}

        case REMOVE_FAVS:
            return {musicFiles: handleRemoveFavs(action.payload, state.musicFiles)};    
        default:
            return state;
    }
}

const handleRemoveFavs = (item, files) => {
    const fileIndex = files.indexOf(item);
    files.splice(fileIndex, 1);
    return files;
};

export default AppReducer;