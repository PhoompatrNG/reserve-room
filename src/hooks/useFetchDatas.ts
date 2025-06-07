import { useState, useEffect, useCallback } from "react";

const useFetchData = (gets: string): { data: string[]; refetch: () => Promise<void> } => {
    const [result, setResult] = useState<string[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`http://172.31.165.13:5678/webhook/10d58f0e-067b-4449-b95f-9d3c299b942a?gets=${gets}`);
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
