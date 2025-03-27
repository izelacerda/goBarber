import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import setValidatationErrors from '../../util/setValidatationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm<
    ForgotPasswordFormData
  >();
  const { addToast } = useToast();
  const onSubmit = useCallback(
    async (data: ForgotPasswordFormData): Promise<void> => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        // recuperar senha
        await api.post('/password/forgot', {
          email: data.email,
        });
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada!',
        });
        // history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidatationErrors(error, setError);
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar recuperar a senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, setError],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Recuperar de Senha</h1>
            <Input
              register={register}
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              error={errors.email}
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </form>
          <Link to="/">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
