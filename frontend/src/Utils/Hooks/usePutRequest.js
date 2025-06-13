import { useState, useCallback } from 'react';

export function usePutRequest(url) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const token = localStorage.getItem('token');

    const putData = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            let requestBody;

            // Si c'est FormData, on ne met pas Content-Type
            if (body instanceof FormData) {
                requestBody = body;
            } else {
                // Sinon c'est du JSON
                headers['Content-Type'] = 'application/json';
                requestBody = JSON.stringify(body);
            }

            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'PUT',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setResponseData(data);
            return data;
        } catch (error) {
            console.error('Erreur : ', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [url, token]);

    return { isLoading, error, responseData, putData };
}