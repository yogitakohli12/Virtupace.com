export const formatTruncateAddress = (
  walletAddress: string,
  delimeter = "••••"
): string => {
  const truncatedPart = walletAddress.slice(0, 5);
  const formattedAddress = `${truncatedPart}${delimeter}${walletAddress.slice(
    -4
  )}`;
  return formattedAddress;
};
