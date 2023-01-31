const prod_url = 'https://ai-image-generator-api-kuq3.onrender.com/api/v1';
const dev_url = 'http://localhost:5000/api/v1';

export const API_URL = process.env.NODE_ENV === 'production' ? prod_url : dev_url;
