import axios from 'axios';
import { API_ROUTES } from './routes';

const AuthService = {
  async login(username: string, password: string, deviceType: string, deviceID: string) {
    try {
      const response = await axios.post(
        API_ROUTES.routeLOGIN,
        { username, password, deviceType, deviceID },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api-supported-versions': '1.0',
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw new Error('Authentication failed, try again');
      } else {
        throw new Error('An error has occured');
      }
    }
  },

  async register(firstName: string, lastName: string, email: string, password: string) {
    try {
      const response = await axios.post(
        API_ROUTES.routeREGISTER,
        { firstName, lastName, email, password },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api-supported-versions': '1.0',
          },
        }
      );
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Error Response Status:', error.response.status);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error;
    }
  },
};

export default AuthService;
