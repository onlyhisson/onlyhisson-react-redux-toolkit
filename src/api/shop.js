/**
 * Mocking client-server processing
 */
import _products from "./products.json";

const TIMEOUT = 100;

const shop = {
  getProducts: (cb, timeout) =>
    setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT),
};

export default shop;
