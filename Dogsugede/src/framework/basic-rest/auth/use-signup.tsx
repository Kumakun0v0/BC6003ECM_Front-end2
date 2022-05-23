import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
}
async function signUp(input: SignUpInputType) {
  return http.post(API_ENDPOINTS.REGISTER, input);
  // return {
  //   token: `${input.email}.${input.name}`.split("").reverse().join(""),
  // };
}
export const useSignUpMutation = () => {
  const { setModalView, openModal, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data: any) => {
      // Cookies.set('auth_token', data.token);
      // authorize();
      closeModal();
      setModalView('SIGN_UP_FIN_VIEW');
      return openModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
