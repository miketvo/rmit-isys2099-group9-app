import { BACKEND_URL } from "../utils/config"

export const getDataAPI = async(url, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${url}`, {
          method: "GET",
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Re-throw the error to let the caller handle it
    }
}

export const postDataAPI = async(url, data, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Re-throw the error to let the caller handle it
    }
}

export const patchDataAPI = async(url, data, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${url}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Re-throw the error to let the caller handle it
    }
}

export const putDataAPI = async(url, data, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Re-throw the error to let the caller handle it
    }
}

export const deleteDataAPI = async (url, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/${url}`, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Re-throw the error to let the caller handle it
    }
}