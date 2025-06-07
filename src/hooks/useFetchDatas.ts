import { useState, useEffect, useCallback } from "react";

const useFetchData = (gets: string): { data: string[]; refetch: () => Promise<void> } => {
    const [result, setResult] = useState<string[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
            const res = await fetch(`${apiUrl}?gets=${gets}`);
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error('Error fetching Data:', err);
        }
    }, [gets]); // Add gets as a dependency for useCallback

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Now fetchData is stable unless 'gets' changes

    return { data: result, refetch: fetchData };
};

export default useFetchData;
