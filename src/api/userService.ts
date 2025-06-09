import api from '../lib/axios';
import { User } from '../types/user';

export interface GetUsersResponse {
  message: string;
  data: User[];
}

export const fetchUsers = async (token: string) => {
  const response = await api.get<GetUsersResponse>('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
