import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}
async function checkout(input: any) {
  console.log('start checkout');
  return http.post(API_ENDPOINTS.ADOPT, input);
  // return input;
}
export const useCheckoutMutation = () => {
  const { items } = useCart();
  return useMutation((input: CheckoutInputType) => checkout({input,items}), {
    onSuccess: (data) => {
      console.log(data, "Checkout success response");
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};
