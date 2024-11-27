// src/utils/auth.js

export const checkAuth = async () => {
    try {
        const response = await fetch('https://localhost:7188/api/auth/check', {
            method: 'GET',
            credentials: 'include' // Küpsiste saatmine päringuga
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Autentimise kontrollimise viga:', error);
        return false;
    }
};

export const logout = async () => {
    try {
        const response = await fetch('https://localhost:7188/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Küpsiste saatmine päringuga
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Viga väljumine');
        }
    } catch (error) {
        console.error('Viga väljumiseks:', error);
        return false;
    }
};
