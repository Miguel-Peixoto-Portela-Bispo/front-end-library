import { HttpMethod } from "./general";

export interface HttpRequest {
    url?: string;
    method?: HttpMethod;
    headers?: Headers;
    body?: string;
}
