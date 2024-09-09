type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IParams {
  method: TMethod;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const client = async (route: string, params?: IParams) => {
  return await fetch(`${baseURL}${route}`, {
		method: params?.method ?? "GET"
	})
	.then((resp) => resp.json())
	.catch((err) => console.error(err));
};
