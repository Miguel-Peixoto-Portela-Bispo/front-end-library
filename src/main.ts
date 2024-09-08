import { addAjaxListener, AjaxData, Swap } from "./dom/ajax"
import { AttributeManager, AttributeAction } from "./dom/attributes"
import { HttpMethod } from "./http/general"
import { getEnumKeyByEnumValue } from "./utils/enums"

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
