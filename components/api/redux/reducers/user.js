const initialState = {
  isAuthenticated: false,
  user: null,
  auth: null,
}

export const userReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'USER_LOADED_SUCCESS':
      return {
        ...state,
        user: payload
      };

    case 'USER_LOADED_FAIL' :
      return {
        ...state,
        user: null,
      };
    case 'AUTHENTICATED_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        auth: null
      }
    case 'AUTHENTICATED_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        auth: payload.auth,
        user: payload.user
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'LOGOUT_FAIL':
      return {
        ...state,
      }

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: false
      }
    case 'SIGNUP_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    case 'SET_AUTH':
      return {
        ...state,
        auth: payload
      }
    default:
      return state
  }
}