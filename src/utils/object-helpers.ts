/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    });
};