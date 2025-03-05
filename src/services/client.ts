import { _get } from "./methods";

const users = {
  get: (username: string) => _get(`/users/${username}`),
};

const client = {
  users,
};

export default client;
