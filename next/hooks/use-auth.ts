import axios from '@/lib/axios';
import { toast } from 'sonner';
import useSWR from 'swr';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuth = () => {
  const { data: user, error, mutate } = useSWR<User>('/api/user');

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const login = async (loginProps: LoginProps) => {
    await csrf();

    axios
      .post('/login', loginProps)
      .then(() => {
        mutate();
        window.location.pathname = '/';
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        toast.error(error.response.data.message);
      });
  };

  const register = async (registerProps: RegisterProps) => {
    await csrf();

    axios
      .post('/register', registerProps)
      .then(() => {
        mutate();
        window.location.pathname = '/';
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        toast.error(error.response.data.message);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
    }

    window.location.pathname = '/login';
  };

  return { user, login, register, logout };
};
