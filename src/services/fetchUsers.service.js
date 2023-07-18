import api from "./api";

export const fetchUsers =  () => {
    try {
      return  api.get('/users');
    } catch (error) {
        console.log(error);
    }
};

