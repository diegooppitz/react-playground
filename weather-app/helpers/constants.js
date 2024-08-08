export const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "colored"
}

export const api_url = "http://api.weatherapi.com/v1/current.json";
export const api_key = process.env.NEXT_PUBLIC_API_KEY;