export interface AttributeAction {
    name: string;
    act: (value: string) => void;
}
export class AttributeManager {
    constructor(private readonly list: AttributeAction[] = []) {}
    doAttribute(attribute: Attr): void {
        this.list.forEach((a) => {
            if (a.name != attribute.name) return;

            a.act(attribute.value);
        });
    }
    addAtrributeAction(...attributeActions: AttributeAction[]): void {
        this.list.push(...attributeActions);
    }
}
