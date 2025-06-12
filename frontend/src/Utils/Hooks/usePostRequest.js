import {useState, useCallback} from 'react';

export function usePostRequest(url) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const token = localStorage.getItem('token');

    const postData = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
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
    }, [url]);

    return { isLoading, error, responseData, postData };
}