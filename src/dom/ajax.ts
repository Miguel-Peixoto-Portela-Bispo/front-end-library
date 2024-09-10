<<<<<<< HEAD
import { HttpMethod } from "../http/general";
import { HttpRequest } from "../http/requests";
import { getEnumKeyByEnumValue } from "../utils/enums";
import { AttributeAction } from "./attributes";
import { getDocumentChildren, replaceElement } from "./elements";

export enum Swap {
    INNER_HTML = "innerHTML",
    OUTTER_HTML = "outerHTML",
}
interface AjaxData {
    request: HttpRequest;
    trigger: Event;
    target: Element;
    swap: Swap;
}

export function getAjaxAttributeActions(element: Element): AttributeAction[] {
    const ajaxData = initAjaxData(element);

    return getActions(ajaxData);
}
function initAjaxData(element: Element): AjaxData {
    return {
        target: element,
        swap: Swap.INNER_HTML,
        trigger: new Event("click"),
        request: {},
    };
}
function getActions(data: AjaxData): AttributeAction[] {
    const prefix = "http:";
    const setMethod = (attr: Attr, method: HttpMethod) => {
        if (data.request) {
            data.request.url = attr.value;
            data.request.method = method;
        }
        if (attr.ownerElement) addAjaxListener(attr.ownerElement, data);
    };

    return [
        {
            name: prefix + "get",
            act: (arg) => setMethod(arg, HttpMethod.GET),
        },
        {
            name: prefix + "post",
            act: (arg) => setMethod(arg, HttpMethod.POST),
        },
        {
            name: prefix + "delete",
            act: (arg) => setMethod(arg, HttpMethod.DELETE),
        },
        {
            name: prefix + "put",
            act: (arg) => setMethod(arg, HttpMethod.PUT),
        },
        {
            name: prefix + "patch",
            act: (arg) => setMethod(arg, HttpMethod.PATCH),
        },
        {
            name: prefix + "trigger",
            act: (arg) => (data.trigger = new Event(arg.value)),
        },
        {
            name: prefix + "target",
            act: (arg) =>
                (data.target = document.querySelector(arg.value) || data.target),
        },
        {
            name: prefix + "swap",
            act: (arg) => {
                const key = getEnumKeyByEnumValue(Swap, arg.value);
                const newSwap = key ? Swap[key] : data.swap;

                return (data.swap = newSwap);
            },
        },
        {
            name: prefix + "headers",
            act: (arg) => {
                const json = JSON.parse(arg.value);

                Object.entries(json).forEach((entry) =>
                    data.request.headers?.append(entry[0], entry[1] as string),
                );
            },
        },
        {
            name: "value",
            act: (arg) => (data.request.body = arg.value),
        },
    ];
}
export function addAjaxListener(element: Element, data: AjaxData): void {
    if (!data.trigger) return;
    element.addEventListener(data.trigger.type, async () => {
        const { request, target, swap } = data;

        if (request && request.url && target && swap) {
            const response = await fetch(
                new Request(request.url, {
                    method: request.method,
                    headers: request.headers,
                    body: request.body,
                }),
            );
            const responseBody = await response.text();
            const parser = new DOMParser();
            const responseDocument = parser.parseFromString(
                responseBody,
                "text/html",
            );
            const elements = getDocumentChildren(responseDocument);

            replaceElement(target, elements);
        }
    });
=======
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
>>>>>>> ee13f0b (first commit)
}
