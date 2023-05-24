import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useAddData = <T>(url: string) =>
  useMutation((data: T) => axios.post(url, data));
