import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  paramsSerializer: {
    indexes: null,
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const statusCode: number = error.response.status;

    const message: string =
      error.response.data.message ??
      messages[statusCode as keyof typeof messages] ??
      "Ocorreu uma falha na plataforma";

    if (statusCode === 401) {
      window.location.href = "/login";
    }

    if (statusCode >= 400 && statusCode !== 401) {
      toast.error(message);
    }
    return error;
  },
);

const messages = {
  200: "Sucesso",
  201: "Criado",
  204: "Excluído com sucesso",
  207: "Alterações concluídas com sucesso",
  400: "Não foi possível interpretar a requisição. Verifique a sintaxe das informações enviadas",
  401: "Você não possui acesso para fazer esta requisição",
  403: "O acesso ao recurso não foi autorizado",
  404: "O recurso solicitado ou o endpoint não foi encontrado",
  406: "O formato enviado não é aceito",
  409: "Esta requisição causou um conflito",
  413: "A entidade requisição é maior do que os limites definidos pelo servidor",
  500: "Ocorreu uma falha na plataforma",
  504: "O servidor não recebeu uma resposta completa a tempo",
};
