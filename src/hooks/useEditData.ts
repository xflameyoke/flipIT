import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useEditData = <T>(url: string, id: string) =>
  useMutation((data: T) => axios.patch(`${url}/${id}`, data));
