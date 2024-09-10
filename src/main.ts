<<<<<<< HEAD
import { getAjaxAttributeActions } from "./dom/ajax";
import { AttributeAction, AttributeManager } from "./dom/attributes";

const factories: ((e: Element) => AttributeAction[])[] = [
    getAjaxAttributeActions,
];

window.onload = () => {
    console.time()
    // for(let i = 0;i < 65;i++)
    // {
    //     console.log("test")
    // }
    initTask(document.documentElement);
    console.timeEnd()
};

function initTask(element: Element): void {
    const children = element.children;

    for (const child of children) {
        const actions = factories.reduce<AttributeAction[]>(
            (prev, cur) => [...prev, ...cur(child)],
            [],
        );
        const manager = new AttributeManager(actions);

        for (const attribute of child.attributes) {
            manager.doAttribute(attribute);
        }
        initTask(child);
    }
}
=======
import { addAjaxListener, AjaxData, Swap } from "./dom/ajax"
import { AttributeManager, AttributeAction } from "./dom/attributes"
import { HttpMethod } from "./http/general"
import { getEnumKeyByEnumValue } from "./utils/enums"

interface HttpContainer
{
    actions: AttributeAction[]
    executed: boolean
}

window.onload = () => initTask(document.documentElement)

function initTask(element: Element): void
{
    const children = element.children

    for(const child of children)
    {
        const ajaxData = initAjaxData(child)
        const httpContainer = initHttpContainer(ajaxData)
        const manager = new AttributeManager(httpContainer.actions)

        for(const attribute of child.attributes)
        {
            manager.doAttribute(attribute)
        }
        if(httpContainer.executed) addAjaxListener(child, ajaxData)
        initTask(child)
    }
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
    }
    const wrap = (func: (arg: string) => void) =>
    {
        return (arg: string) =>
        {
            func(arg)
            result.executed = true
        }
    }

    result.actions = [
        {
            name: prefix + "get",
            act: wrap(arg => setMethod(arg, HttpMethod.GET))
        },
        {
            name: prefix + "post",
            act: wrap(arg => setMethod(arg, HttpMethod.POST))
        },
        {
            name: prefix + "delete",
            act: wrap(arg => setMethod(arg, HttpMethod.DELETE))
        },
        {
            name: prefix + "put",
            act: wrap(arg => setMethod(arg, HttpMethod.PUT))
        },
        {
            name: prefix + "patch",
            act: wrap(arg => setMethod(arg, HttpMethod.PATCH))
        },
        {
            name: prefix + "trigger",
            act: wrap(arg => data.trigger = new Event(arg))
        },
        {
            name: prefix + "target",
            act: wrap(
                arg => data.target = document.querySelector(arg) ||
                    data.target
            )
        },
        {
            name: prefix + "swap",
            act: wrap(
                arg => data.swap = Swap[
                    getEnumKeyByEnumValue(Swap, arg) || "INNER_HTML"
                ]
            )
        }
    ]
    return result
}
>>>>>>> ee13f0b (first commit)
