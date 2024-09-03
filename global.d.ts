// interface Window {
//   ethereum: any;
// }
interface Window {
  ethereum: import("ethers").providers.ExternalProvider;
}
