import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import setValidatationErrors from '../../util/setValidatationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<
    SignInFormData
  >();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const onSubmit = useCallback(
    async (data: SignInFormData): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({ email: data.email, password: data.password });
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidatationErrors(error, setError);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, history, addToast, setError],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="gobarber" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu Logon</h1>
            <Input
              register={register}
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              error={errors.email}
            />
            <Input
              register={register}
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              error={errors.password}
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
