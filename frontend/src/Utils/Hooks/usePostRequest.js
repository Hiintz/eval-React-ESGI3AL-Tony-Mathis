import { useState, useCallback } from 'react';

export function usePostRequest(url) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const token = localStorage.getItem('token');

    const postData = useCallback(async (body) => {
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
                // Sinon c'est du JSON (pour éviter les erreur de jsonisation du form date (:))
                headers['Content-Type'] = 'application/json';
                requestBody = JSON.stringify(body);
            }

            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Erreur : ', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [url, token]);

    return { isLoading, error, responseData, postData };
}