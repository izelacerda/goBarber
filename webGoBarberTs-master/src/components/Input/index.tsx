import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useForm, FieldError } from 'react-hook-form';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
// eslint-disable-next-line import/no-unresolved
import { Container, Error } from './styles';

type ChildInputProps = Pick<ReturnType<typeof useForm>, 'register'>;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon: React.ComponentType<IconBaseProps>;
  register: ChildInputProps['register'];
  error: FieldError | undefined;
}
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  error,
  register,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current);
    }
  }, [register]);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);
  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error?.message}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
