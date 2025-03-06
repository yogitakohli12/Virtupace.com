import CryptoJS from "crypto-js";

const encryptAmount = (amount: number) => {
  const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET || "";
  const iv = CryptoJS.enc.Hex.parse("0000000000000000");
  const encryptedAmount = CryptoJS.AES.encrypt(
    amount.toString(),
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv,
    }
  ).toString();
  return encryptedAmount;
};

export default encryptAmount;
