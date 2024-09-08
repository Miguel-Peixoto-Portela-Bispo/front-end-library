import { getAjaxAttributeActions } from "./dom/ajax";
import { AttributeAction, AttributeManager } from "./dom/attributes";

const factories: ((e: Element) => AttributeAction[])[] = [
    getAjaxAttributeActions,
];

window.onload = () => initTask(document.documentElement);

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
