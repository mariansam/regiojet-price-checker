// https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257

export const request = async <TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> => {
    const res = await fetch(url, config);

    const data = await res.json();

    return data as TResponse;
}
