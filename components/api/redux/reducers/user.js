const initialState = {
  isAuthenticated: false,
  user: null,
  password: null,
  token: null
}

export const userReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        password: payload.password
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        password: null,
        token: null
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
        token: null
      };
    case 'AUTHENTICATED_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      }
    case 'AUTHENTICATED_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
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
    default:
      return state
  }
}