import request from "@/utils/goods-request";
export const reqTradeMarkList = (page, limit) => {
  console.log(2);
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
};
