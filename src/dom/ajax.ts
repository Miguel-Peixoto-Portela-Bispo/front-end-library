import { HttpRequest } from "../http/requests"
import { getDocumentChildren, replaceElement } from "./elements"

export enum Swap
{
    INNER_HTML = "innerHTML",
    OUTTER_HTML = "outerHTML"
}
export interface AjaxData
{
    request: HttpRequest
    trigger: Event
    target: Element
    swap: Swap
}

export function addAjaxListener(element: Element, data: AjaxData): void
{
    if(data.trigger)
    {
        element.addEventListener(data.trigger.type, async () =>
        {
            const { request, target, swap } = data

            if(request && request.url && target && swap)
            {
                const response = await fetch(
                    new Request(request.url, {
                        method: request.method,
                        headers: request.headers,
                        body: request.body
                    })
                )
                const responseBody = await response.text()
                const parser = new DOMParser()
                const responseDocument = parser
                    .parseFromString(responseBody, "text/html")
                const elements = getDocumentChildren(responseDocument)

                replaceElement(target, elements)
            }
        })
    }
}
