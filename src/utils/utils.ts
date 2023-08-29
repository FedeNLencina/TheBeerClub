  export const keyExits = (idList: string[], key: string): boolean => {
    return idList.includes(key);
  };

  export const tableIdExists = (tableList: number[], id: number): boolean => {
    return tableList.includes(id);
  };