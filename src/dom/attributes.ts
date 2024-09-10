export interface AttributeAction {
    name: string;
    act: (value: Attr) => void;
}
export class AttributeManager {
    constructor(private readonly list: AttributeAction[] = []) {}
    doAttribute(attribute: Attr): void {
        this.list.forEach((a) => {
            if (a.name != attribute.name) return;

            a.act(attribute);
        });
    }
    addAtrributeAction(...attributeActions: AttributeAction[]): void {
        this.list.push(...attributeActions);
    }
}
