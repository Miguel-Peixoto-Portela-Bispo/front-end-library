<<<<<<< HEAD
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
=======
export interface AttributeAction
{
    name: string;
    act: (value: string) => void
}
export class AttributeManager
{

    constructor(
        private readonly list: AttributeAction[] = []
    ){}
    doAttribute(attribute: Attr)
    {
        this.list.forEach(a =>
        {
             if(a.name != attribute.name) return

             a.act(attribute.value)
        })
    }
    addAtrributeAction(...attributeActions: AttributeAction[])
    {
        this.list.push(...attributeActions)
>>>>>>> ee13f0b (first commit)
    }
}
