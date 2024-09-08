import { HttpMethod } from "../http/general"
import { HttpRequest } from "../http/requests"
import { getEnumKeyByEnumValue } from "../utils/enums"
import { AttributeAction, AttributeManager } from "./attributes"
import { getDocumentChildren, replaceElement } from "./elements"

export enum Swap
{
    INNER_HTML = "innerHTML",
    OUTTER_HTML = "outerHTML"
}
interface AjaxData
{
    request: HttpRequest
    trigger: Event
    target: Element
    swap: Swap
}
interface HttpContainer
{
    actions: AttributeAction[]
    executed: boolean
}

let httpContainer: HttpContainer | null = null
let lastElement: Element | undefined

export function getAttributeActions(element: Element): AttributeAction[]
{
    const ajaxData = initAjaxData(element)

    httpContainer = initHttpContainer(ajaxData)
    if(lastElement != element)
    {
    }
    lastElement = element
    return httpContainer.actions
}
function initAjaxData(element: Element): AjaxData
{
    return {
        target: element,
        swap: Swap.INNER_HTML,
        trigger: new Event("click"),
        request: {}
    }
}
function initHttpContainer(data: AjaxData): HttpContainer
{
    const result: HttpContainer = { actions: [], executed: false }
    const prefix = "http:"
    const setMethod = (url: string, method: HttpMethod) =>
    {
        if(data.request)
        {
            data.request.url = url
            data.request.method = method
        }
        result.executed = true
    }

    result.actions = [
        {
            name: prefix + "get",
            act: arg => setMethod(arg, HttpMethod.GET)
        },
        {
            name: prefix + "post",
            act: arg => setMethod(arg, HttpMethod.POST)
        },
        {
            name: prefix + "delete",
            act: arg => setMethod(arg, HttpMethod.DELETE)
        },
        {
            name: prefix + "put",
            act: arg => setMethod(arg, HttpMethod.PUT)
        },
        {
            name: prefix + "patch",
            act: arg => setMethod(arg, HttpMethod.PATCH)
        },
        {
            name: prefix + "trigger",
            act: arg => data.trigger = new Event(arg)
        },
        {
            name: prefix + "target",
            act: arg => data.target = document.querySelector(arg) ||
                    data.target
        },
        {
            name: prefix + "swap",
            act: arg =>
            {
                const key = getEnumKeyByEnumValue(Swap, arg)
                const newSwap = key ? Swap[key] : data.swap

                return data.swap = newSwap
            }
        },
        {
            name: prefix + "headers",
            act: arg =>
            {
                const json = JSON.parse(arg)

                Object.entries(json)
                .forEach(
                    entry =>
                    data.request.headers?.append(
                        entry[0], entry[1] as string
                    )
                )
            }
        },
        {
            name: "value",
            act: arg => data.request.body = arg
        }
    ]
    return result
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
