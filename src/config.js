let environment = false;

const moduleConfig = {
    PROD_API_URL: 'https://backend.qube.so',
    DEV_API_URL: 'http://localhost:8080'
}

export const API_URL = environment ? moduleConfig.PROD_API_URL : moduleConfig.DEV_API_URL;