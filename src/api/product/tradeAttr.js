import request from "@/utils/goods-request";

export const reqCategory1List = () => {
  return request({ url: "/admin/product/getCategory1", method: "get" });
};
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
};
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
};
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};
export const reqAddAttr=(data)=>{
  return request({url:'/admin/product/saveAttrInfo',method:'post',data})
}