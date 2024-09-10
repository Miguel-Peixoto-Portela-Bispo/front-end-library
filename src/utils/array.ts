<<<<<<< HEAD
export function arraysEqual(a: any[], b: any[]): boolean {
=======
export function arraysEqual(a: any[], b: any[])
{
>>>>>>> ee13f0b (first commit)
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

<<<<<<< HEAD
    for (let i = 0; i < a.length; i++) {
=======

    for (let i = 0; i < a.length; ++i)
    {
>>>>>>> ee13f0b (first commit)
        if (a[i] !== b[i]) return false;
    }
    return true;
}
