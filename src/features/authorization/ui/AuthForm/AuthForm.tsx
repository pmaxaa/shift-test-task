import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import cls from './AuthForm.module.scss';
import { declensionOfWords } from '@/shared/lib/getWordDeclension/getWordDeclension';
import { useAuth } from '../../model/useAuth';

export const AuthForm = ({ className }: { className: string }) => {
  const {
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
  } = useAuth();

  return (
    <div className={classNames(cls.form, className)}>
      <h1>Вход</h1>
      {!isOtpSent ? (
        <>
          <p>
            Введите номер телефона для входа <br /> в личный кабинет
          </p>
          <form onSubmit={handleSubmit(handlePhoneSubmit)}>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Поле является обязательным' }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  onKeyDown={handleKeyDown}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
            <Button type="submit" className={cls.submitButton}>
              Продолжить
            </Button>
          </form>
        </>
      ) : (
        <>
          <p>
            Введите проверочный код для входа <br /> в личный кабинет
          </p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: 'Поле является обязательным',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Телефон"
                  errorMessage={errors.phoneNumber?.message}
                  onKeyDown={handleKeyDown}
                />
              )}
            />
            <Controller
              name="otpCode"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Код должен содержать 6 цифр',
                },
                required: 'Код должен содержать 6 цифр',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Проверочный код"
                  errorMessage={errors.otpCode?.message}
                  onKeyDown={handleKeyDown}
                />
              )}
            />
            <Button type="submit" className={cls.submitButton}>
              Продолжить
            </Button>
            {retryDelay === null ? (
              <Button
                variant="text"
                onClick={() => otpMutation.mutate(getValues('phoneNumber'))}
              >
                Запросить код еще раз
              </Button>
            ) : (
              <p
                className={cls.retryMessage}
              >{`Запросить код повторно можно через ${
                retryDelay / 1000
              } ${declensionOfWords(retryDelay / 1000, [
                'секундy',
                'секунды',
                'секунд',
              ])}`}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};
