//function to convert a number to decimal points
//use to round prices in the shop cart
export const round2 = (num: number) =>
Math.round((num + Number.EPSILON) * 100) / 100