import cls from './AuthPage.module.scss';
import { AuthForm } from '@/features/authorization/ui/AuthForm/AuthForm';

export function AuthPage() {
  return (
    <div className={cls.authPage}>
      <AuthForm className={cls.authForm} />
    </div>
  );
}
