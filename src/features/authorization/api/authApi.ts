import { httpClient } from '@/shared/api/api';

export const otpRequest = async (phone: string) => {
  const response = await httpClient.post('auth/otp', { phone });
  return response.data;
};

export const authRequest = async (phone: string, otpCode: string) => {
  const code = Number(otpCode);
  const response = await httpClient.post('/users/signin', {
    phone,
    code,
  });
  return response.data;
};
