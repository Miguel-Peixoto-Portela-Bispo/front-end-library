const forceTransition = prepareTransitionForcing(150);

export function replaceElement(
    original: Element,
    ...newElements: Element[]
): void {
    const visibleElements = newElements.filter(
        (e) => getComputedStyle(e).display != "none",
    );
    const firstVisible = visibleElements[0];
    const smooth = isSmoothlyReplaceable(original, firstVisible);
    const htmlOriginal = original && (original as HTMLElement);
    const originalStyle = htmlOriginal.style.cssText;

    original.replaceWith(...newElements);
    if (visibleElements.length != 1 && !smooth) return;
    resetStyleFrom(originalStyle, firstVisible);
}
function resetStyleFrom(style: string, element: Element) {
    const htmlElement = element && (element as HTMLElement);
    const originalStyle = htmlElement.style.cssText;

    htmlElement.style.cssText = style || "";
    forceTransition(originalStyle, htmlElement);
}
function prepareTransitionForcing(max: number) {
    let toRestyleCount = 0;

    return (style: string, element: HTMLElement) => {
        toRestyleCount++;
        setTimeout(() => {
            element.style.cssText = style || "";
            toRestyleCount %= max;
        }, toRestyleCount * 2);
    };
}
function isSmoothlyReplaceable(element: Element, element2: Element) {
    return element.tagName == element2.tagName && element.id == element2.id;
}
export function getDocumentChildren(doc: Document) {
    return [...doc.head.children, ...doc.body.children];
}
