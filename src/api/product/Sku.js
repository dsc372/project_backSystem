import request from "@/utils/goods-request";
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
};
export const reqSpuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
};
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};
export const reqSkuList = (page, limit) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });
};
export const reqOnSale = (skuId) => {
  return request({ url: `/admin/product/onSale/${skuId}`, method: "get" });
};
export const reqCancelSale = (skuId) => {
  return request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" });
};
export const reqGetSkuById = (skuId) => {
  return request({ url: `/admin/product/getSkuById/${skuId}`, method: "get" });
};
