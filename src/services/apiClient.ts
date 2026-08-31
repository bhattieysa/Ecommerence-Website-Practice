import axios, { type AxiosInstance, type AxiosError } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const originalRequest: any = (error.config as any) || {};

        // If 401, attempt token refresh and retry the original request
        if (error.response && (error.response.status === 401 || (error.response.status === 403 && !originalRequest._retry))) {
          if (originalRequest._retry) {
            // Already retried, reject
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          if (this.isRefreshing) {
            // Queue the request until refresh completes
            return new Promise((resolve, reject) => {
              this.refreshSubscribers.push((token: string) => {
                if (!originalRequest.headers) originalRequest.headers = {};
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client.request(originalRequest));
              });
            });
          }

          this.isRefreshing = true;

          // Use a plain axios instance to call refresh endpoint (include cookies)
          const refreshClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

          return refreshClient.post('/auth/refresh-token')
            .then((res) => {
              const newToken = res.data?.data?.accessToken;
              if (newToken) {
                localStorage.setItem('accessToken', newToken);
                  // Notify app that access token was refreshed so AuthContext can update
                  try {
                    window.dispatchEvent(new CustomEvent('megamar:accessTokenRefreshed', { detail: { accessToken: newToken } }));
                  } catch (e) {}
                // update default header for future requests
                (this.client.defaults.headers as any).Authorization = `Bearer ${newToken}`;

                // retry original request
                if (!originalRequest.headers) originalRequest.headers = {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // notify subscribers
                this.refreshSubscribers.forEach((cb) => cb(newToken));
                this.refreshSubscribers = [];
                this.isRefreshing = false;

                return this.client.request(originalRequest);
              }
              this.isRefreshing = false;
              return Promise.reject(error);
            })
            .catch((refreshErr) => {
              this.isRefreshing = false;
              this.refreshSubscribers = [];
              // Clear tokens on refresh failure and notify app
              try {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
              } catch (e) {}
              try {
                window.dispatchEvent(new CustomEvent('megamar:accessTokenCleared'));
              } catch (e) {}
              return Promise.reject(refreshErr);
            });
        }

        if (error.response) {
          // Server responded with error status
          const responseData = error.response.data as any;
          const message = responseData?.message || 'An error occurred';
          const errors = responseData?.errors;
          console.error('API Error:', message, errors);

          // Create error with both message and field errors
          const errorObj = new Error(message) as any;
          if (errors) {
            errorObj.errors = errors;
          }
          return Promise.reject(errorObj);
        } else if (error.request) {
          // Request made but no response
          console.error('Network Error: No response received');
          return Promise.reject(
            new Error('Network error. Please check your connection.'),
          );
        } else {
          // Error in request setup
          console.error('Request Error:', error.message);
          return Promise.reject(error);
        }
      },
    );
  }

  public get axiosInstance() {
    return this.client;
  }
}

export const apiClient = new ApiClient();
