export const initialState = {
  CustomerUser: window.localStorage.getItem('customer_token'),
  AdminUser : window.localStorage.getItem('admin_token')
};

export const actionTypes = {
  SET_CUSTOMER : "SET_CUSTOMER",
  SET_ADMIN : "SET_ADMIN"
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_CUSTOMER:
      window.localStorage.setItem('customer_token',action.customerToken);
      return {
        ...state,
        customerToken: action.customerToken,
      };
      case actionTypes.SET_ADMIN:
        window.localStorage.setItem('admin_token',action.adminToken);
        return {
          ...state,
          adminToken: action.adminToken,
        };

    default:
      return state;
  }
};

