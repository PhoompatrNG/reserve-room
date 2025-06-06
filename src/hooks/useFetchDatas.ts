import { useState, useEffect } from "react";

const useFetchData = (gets: string): string[] => {
    const [result, setResult] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://172.31.165.13:5678/webhook/10d58f0e-067b-4449-b95f-9d3c299b942a?gets=${gets}`);
                const data = await res.json();
                setResult(data);
            } catch (err) {
                console.error('Error fetching Data:', err);
            }
        };

        fetchData();
    }, [gets]);

    return result;
};

export default useFetchData;
