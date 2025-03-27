import React, { useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import setValidatationErrors from '../../util/setValidatationErrors';
import { useAuth } from '../../hooks/auth';

// interface FormHandles {
//   getFieldValue(fieldName: string): any;
//   setFieldValue(fieldname: string, value: any): void | boolean;
//   setErrors(errors: object): void;
// }
type ProfileForm = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile: React.FC = () => {
  // const formRef = useRef<FormHandles>(null);
  const { register, handleSubmit, errors, setError } = useForm<ProfileForm>();
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();
  const onSubmit = useCallback(
    async (data: ProfileForm): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password')],
              'Confirmação de senha difere da senha',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
          profile: 1,
        };
        const response = await api.put('/profile', formData);
        updateUser(response.data);
        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidatationErrors(error, setError);
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao fazer atualizado o perfil, tente novamente',
        });
      }
    },
    [addToast, history, setError, updateUser],
  );
  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );
  return (
    <Container>
      <header>
        <Link to="/dashboard">
          <div>
            <FiArrowLeft />
          </div>
        </Link>
      </header>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu Perfil</h1>
          <Input
            icon={FiUser}
            name="name"
            defaultValue={user.name}
            placeholder="Nome"
            register={register}
            error={errors.name}
          />
          <Input
            icon={FiMail}
            name="email"
            defaultValue={user.email}
            placeholder="E-mail"
            register={register}
            error={errors.email}
          />
          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            type="password"
            placeholder="Senha atual"
            register={register}
            error={errors.old_password}
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
            register={register}
            error={errors.password}
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirmar senha"
            register={register}
            error={errors.password_confirmation}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
