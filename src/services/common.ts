// Get Abbrevation of hex addres //
export const reduceHexAddress = (strAddress: string, nDigits: number) =>
    strAddress
        ? `${strAddress.substring(0, 2 + nDigits)}...${strAddress.substring(
              strAddress.length - nDigits,
              strAddress.length
          )}`
        : '';
