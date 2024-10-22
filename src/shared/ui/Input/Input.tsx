import { forwardRef, InputHTMLAttributes } from 'react';

import cls from './Input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, errorMessage, ...otherProps } = props;

  return (
    <div className={classNames(cls.inputWrapper, className)}>
      <input
        className={classNames(cls.input, { [cls.error]: !!errorMessage })}
        ref={ref}
        aria-describedby="error-text"
        {...otherProps}
      />
      {errorMessage && (
        <div id="error-text" className={cls.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
});
