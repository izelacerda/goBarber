import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import setValidatationErrors from '../../util/setValidatationErrors';

// interface FormHandles {
//   getFieldValue(fieldName: string): any;
//   setFieldValue(fieldname: string, value: any): void | boolean;
//   setErrors(errors: object): void;
// }
type UserForm = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  // const formRef = useRef<FormHandles>(null);
  const { register, handleSubmit, errors, setError } = useForm<UserForm>();
  const { addToast } = useToast();
  const history = useHistory();
  const onSubmit = useCallback(
    async (data: UserForm): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', { ...data, profile: 1 });
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer o seu login!',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidatationErrors(error, setError);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history, setError],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="gobarber" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu Cadastro</h1>
            <Input
              icon={FiUser}
              name="name"
              placeholder="Nome"
              register={register}
              error={errors.name}
            />
            <Input
              icon={FiMail}
              name="email"
              placeholder="E-mail"
              register={register}
              error={errors.email}
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
              register={register}
              error={errors.password}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
