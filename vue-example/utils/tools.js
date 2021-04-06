//修正Element的页码显示
export const getIndexGet = function(index, currentPage, showCount) {
  return (currentPage - 1) * showCount + index + 1;
};
