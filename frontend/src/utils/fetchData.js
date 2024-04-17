export const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
        'X-RapidAPI-Host': `${import.meta.env.VITE_HOST}`
    }
};

export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json()
    return data;
}