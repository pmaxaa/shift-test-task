import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from './types/loginSchema';
import { authRequest, otpRequest } from '../api/authApi';

export const useAuth = () => {
  const [retryDelay, setRetryDelay] = useState<null | number>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    if (retryDelay !== null) {
      let timer: number;
      if (retryDelay === 0) {
        setRetryDelay(null);
      } else {
        timer = setTimeout(() => setRetryDelay(retryDelay - 1000), 1000);
      }
      return () => clearTimeout(timer);
    }
  }, [retryDelay]);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', '.', '-', '+'].includes(event.key)) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const otpMutation = useMutation(otpRequest, {
    onSuccess: (data) => {
      setIsOtpSent(true);
      setRetryDelay(data.retryDelay);
    },
  });

  const loginMutation = useMutation(
    (formData: LoginSchema) =>
      authRequest(formData.phoneNumber, formData.otpCode),
    {
      onSuccess: (data) => {
        alert(`Вход выполнен, токен доступа: ${data.token}`);
        reset();
      },
      onError: (error: AxiosError) =>
        alert('Ошибка входа: ' + JSON.stringify(error.response?.data)),
    },
  );

  const handlePhoneSubmit: SubmitHandler<LoginSchema> = (data) => {
    otpMutation.mutate(data.phoneNumber);
  };

  const handleLogin: SubmitHandler<LoginSchema> = (data) => {
    loginMutation.mutate(data);
  };

  return {
    isOtpSent,
    control,
    handleSubmit,
    getValues,
    errors,
    handleKeyDown,
    handlePhoneSubmit,
    handleLogin,
    retryDelay,
    otpMutation,
  };
};
