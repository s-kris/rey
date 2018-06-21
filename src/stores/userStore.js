import { store } from 'react-easy-state';

const userStore = store({ user: {}, loggedIn: false });

export default userStore;
