import {useCallback } from 'react';

export function useDeleteRequest(url) {
    const token = localStorage.getItem('token');

    const deleteData = useCallback(async () => {

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur : ', error);
        }
    }, [url]);

    return { deleteData };
}