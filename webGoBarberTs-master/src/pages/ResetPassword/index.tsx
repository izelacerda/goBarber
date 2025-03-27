import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import setValidatationErrors from '../../util/setValidatationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

type ResetPasswordFormData = {
  password: string;
  password_confirmation: string;
};

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<
    ResetPasswordFormData
  >();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const onSubmit = useCallback(
    async (data: ResetPasswordFormData): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação de senha difere da senha',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) {
          throw new Error();
        }
        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidatationErrors(error, setError);
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [location.search, history, addToast, setError],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="gobarber" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Resetar Senha</h1>
            <Input
              register={register}
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
              error={errors.password}
            />
            <Input
              register={register}
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da Senha"
              error={errors.password_confirmation}
            />
            <Button type="submit">Alterar Senha</Button>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
