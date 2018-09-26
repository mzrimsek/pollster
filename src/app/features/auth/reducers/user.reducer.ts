import * as actions from '../actions/user.actions';

export interface State {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string;
}

const initialState: State = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  providerId: ''
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.AUTHENTICATED: {
      return {
        ...state,
        ...action.user
      };
    }
    case actions.NOT_AUTHENTICATED: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
