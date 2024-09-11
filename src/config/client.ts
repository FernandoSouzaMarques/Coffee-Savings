type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IParams {
  method: TMethod;
	body?: BodyInit | null;
	next?: NextFetchRequestConfig;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const client = async (route: string, params?: IParams) => {
  return await fetch(`${baseURL}${route}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: params?.method ?? "GET",
		body: params?.body ?? undefined,
		next: params?.next,
	})
	.then((resp) => resp.json())
	.catch((err) => console.error(err));
};
