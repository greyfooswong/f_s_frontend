import { instance } from "./index";

export const getUserFile = () => {
    return instance({
        url: "/api/v1/getUserFile",
        method: "POST",
        data: {

        }
    })
}
