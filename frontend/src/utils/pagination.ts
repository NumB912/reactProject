 export const generatePageNumbers = (page:number,totalPage:number) => {
    const pages = [];
    
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      } else if (page >= totalPage - 3) {

        pages.push(1);
        pages.push("...");
        for (let i = totalPage - 4; i <= totalPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      }
    }
    
    return pages;
  };