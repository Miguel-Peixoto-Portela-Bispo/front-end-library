<<<<<<< HEAD
export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
    myEnum: T,
    enumValue: string,
): keyof T | null {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
=======
export function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null
{
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
>>>>>>> ee13f0b (first commit)
    return keys.length > 0 ? keys[0] : null;
}
