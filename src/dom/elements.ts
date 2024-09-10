<<<<<<< HEAD
export function isSmoothlyReplaceable(element: Element, element2: Element) {
    return element.tagName == element2.tagName && element.id == element2.id;
}
export function replaceElement(original: Element, newElements: Element[]) {
    const visibleElements = newElements.filter(
        (e) => getComputedStyle(e).display != "none",
    );
    const firstVisible = visibleElements[0];
    const smooth = isSmoothlyReplaceable(original, firstVisible);
    const htmlVisible = firstVisible && (firstVisible as HTMLElement);
    const htmlOriginal = original && (original as HTMLElement);
    const visibleStyle = htmlVisible.style.cssText;
    const originalStyle = htmlOriginal.style.cssText;

    original.replaceWith(...newElements);
    if (visibleElements.length != 1 && !smooth) return;
    htmlVisible.style.cssText = originalStyle || "";
    setTimeout(() => {
        htmlVisible.style.cssText = visibleStyle || "";
    });
}
export function getDocumentChildren(doc: Document) {
    return [...doc.head.children, ...doc.body.children];
=======
import { arraysEqual } from "../utils/array"

export function isSameSignature(element: Element, element2: Element)
{
    return element.tagName == element2.tagName &&
           element.id == element2.id           &&
           arraysEqual([...element.classList], [...element2.classList])
}
export function replaceElement(original: Element, newElements: Element[]) 
{
    const visibleElements = newElements.filter((e) =>
        getComputedStyle(e).display != "none"
    )
    const firstVisible = visibleElements[0]
    const isSame = isSameSignature(original, firstVisible)
    const visibleStyle = firstVisible?.getAttribute("style")
    const targetStyle = original?.getAttribute("style")

    original.replaceWith(...newElements)
    if(visibleElements.length == 1 && isSame)
    {
        if(targetStyle)
            firstVisible.setAttribute("style", targetStyle)
        setTimeout(() =>
        {
            if(visibleStyle)
                firstVisible.setAttribute("style", visibleStyle)
        })
    }
}
export function getDocumentChildren(doc: Document)
{
    return [...doc.head.children, ...doc.body.children]
>>>>>>> ee13f0b (first commit)
}
