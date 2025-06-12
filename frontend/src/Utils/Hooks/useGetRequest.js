import {useState, useEffect, useCallback} from 'react';

export function useGetRequest(url) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');


    const getData = useCallback(async () => {
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setData(data);
        } catch (err) {
            console.error('Erreur lors de la récupération des données:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
            getData().then(data => {
                console.log('Données: ' + data);
            });
    }, [url]);

    return { data, isLoading, error,  getData };
}