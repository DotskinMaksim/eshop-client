// src/utils/auth.js

export const checkAuth = async () => {
    try {
        const response = await fetch('https://localhost:7188/api/auth/check', {
            method: 'GET',
            credentials: 'include' // Отправка куки с запросом
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
        return false;
    }
};

export const logout = async () => {
    try {
        const response = await fetch('https://localhost:7188/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Отправка куки с запросом
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Ошибка при выходе');
        }
    } catch (error) {
        console.error('Ошибка выхода:', error);
        return false;
    }
};
