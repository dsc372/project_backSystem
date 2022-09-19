import request from "@/utils/goods-request";

export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });
};
export const reqSpu = (spuId) => {
  return request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });
};
export const reqTradeMarkList = () => {
  return request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });
};
export const reqSpuImgList = (spuId) => {
  return request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });
};
export const reqBaseSaleList = () => {
  return request({ url: "/admin/product/baseSaleAttrList", method: "get" });
};
