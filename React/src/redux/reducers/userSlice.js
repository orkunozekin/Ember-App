import {Types} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  user: {}
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
    //console.log('login', action.payload.user)
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true // after update user formsubmition reset
      }
    // case Types.ADD_USER:
    //   return {
    //     ...state,
    //     profile: action.payload.user,
    //     formSubmitted: false // after update user formsubmition reset
    //   }
    // case Types.UPDATE_USER:
    //   return {
    //     ...state,
    //     profile: action.payload.user,
    //     formSubmitted: false // after update user formsubmition reset
    //   }
    // case Types.UPDATE_PROFILE_PICTURE:
    //   return {
    //     ...state,
    //     profile: {
    //       ...state.profile,
    //       profileImage: action.payload.image
    //     }
    //   }
    // case Types.FORM_SUBMITION_STATUS:
    //   return {
    //     ...state,
    //     formSubmitted: action.payload.status
    //   }
    default:
      return state;
  }
}

export default loginReducer;