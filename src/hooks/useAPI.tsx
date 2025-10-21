import { API_URL, MESSAGE } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLoading } from "./useLoading";

export function useAPI() {
    const router = useRouter();
    const { showLoading, hideLoading } = useLoading();

    const request = async (
        method: string,
        url: string,
        data: any = {},
        showToast: boolean = false,
        showLoadingUI: boolean = true
    ): Promise<any> => {
        url = url.startsWith("/") ? url.slice(1) : url;

        const headers: any = {
            ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' }),
        };

        try {
            if (showLoadingUI) {
                showLoading();
            }

            const response = await fetch(`${API_URL}/api/${url}`, {
                method,
                headers,
                body: method === 'GET' || method === 'DELETE' ? null : data instanceof FormData ? data : JSON.stringify(data),
            });

            if (!response.ok) {
                return handleErrorResponse(response, showToast);
            }

            const responseData = await response.json();

            if (showToast) {
                toast.success(responseData.message || MESSAGE.SUCCESS);
            }

            responseData.success = true;
            return responseData;
        } catch (error) {
            return handleErrorResponse(error, showToast);
        } finally {
            if (showLoadingUI) {
                hideLoading();
            }
        }
    };

    const handleErrorResponse = async (response: any, showToast: boolean = true): Promise<any> => {
        try {
            let message = MESSAGE.ERROR;
            let status = response?.status;
            let responseData = await response.json();

            if (responseData?.message) {
                message = responseData.message;
            } else {
                message = response?.statusText || MESSAGE.ERROR;
            }

            switch (status) {
                case 401:
                    message = MESSAGE.UNAUTHORIZED;
                    // router.push("/login");
                    break;
                case 403:
                    message = MESSAGE.FORBIDDEN;
                    // router.push("./dashboard");
                    break;
                case 404:
                    message = MESSAGE.NOT_FOUND;
                    break;
                case 500:
                    message = MESSAGE.SERVER_ERROR;
                    break;
            }

            if (showToast) {
                toast.error(message);
            }

            responseData.success = false;
            responseData.message = message;
            responseData.status = status;
            return responseData;
        } catch (err) {
            // console.error("Error handling response:", err);
            return { success: false, message: MESSAGE.DISCONNECTED };
        }
    };

    const API = {
        get: (
            url: string,
            showToast: boolean = true,
            showLoading: boolean = true
        ): Promise<any> => request('GET', url, {}, showToast, showLoading),

        post: (
            url: string,
            data: any = {},
            showToast: boolean = true,
            showLoading: boolean = true
        ): Promise<any> => request('POST', url, data, showToast, showLoading),

        put: (
            url: string,
            data: any = {},
            showToast: boolean = true,
            showLoading: boolean = true
        ): Promise<any> => request('PUT', url, data, showToast, showLoading),

        delete: (
            url: string,
            data: any = {},
            showToast: boolean = true,
            showLoading: boolean = true
        ): Promise<any> => request('DELETE', url, data, showToast, showLoading),
    };

    return { API };
}