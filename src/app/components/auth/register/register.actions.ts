export const REGISTER_REQUESTED = 'REGISTER_REQUESTED';
export const REGISTER_SUCCESSED = 'REGISTER_SUCCESSED';
export const RENDER_REGISTER_FORM_REQUESTED = 'RENDER_REGISTER_FORM_REQUESTED';

export const renderRegisterForm = payload => {
  return {
    type: RENDER_REGISTER_FORM_REQUESTED,
    data: payload
  };
};
