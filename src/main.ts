import { getAjaxAttributeActions } from "./dom/ajax";
import { AttributeAction, AttributeManager } from "./dom/attributes";

const factories: ((e: Element) => AttributeAction[])[] = [
    getAjaxAttributeActions,
];

window.onload = () => initTask(document.documentElement);

export function initTask(element: Element): void {
    doWork(element);
    for (const child of element.children) {
        initTask(child);
    }
}
function doWork(element: Element) {
    const actions = factories.reduce<AttributeAction[]>(
        (prev, cur) => [...prev, ...cur(element)],
        [],
    );
    const manager = new AttributeManager(actions);

    for (const attribute of element.attributes) {
        manager.doAttribute(attribute);
    }
}
