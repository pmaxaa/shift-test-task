import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';
import classNames from 'classnames';

type ButtonVariant = 'contained' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const { className, variant = 'contained', children, ...otherProps } = props;
  return (
    <button
      type="button"
      className={classNames(cls.button, [cls[variant]], className)}
      {...otherProps}
    >
      {children}
    </button>
  );
});
