class Wex<T extends { [key: string]: any }> {
  private store: T;
  private observer: T;
  private pages: Set<any>;
  constructor(store: T) {
    this.pages = new Set();
    this.store = store;
    if (Proxy) {
      this.observer = new Proxy(store, {
        set: (target: { [key: string]: any }, p: string, value) => {
          target[p] = value;
          this.pages.forEach((element: any) => {
            element.setData({
              [p]: value,
            });
          });
          return true;
        },
        get: (target, p: string) => {
          return target[p];
        },
      }) as T;
    } else {
      this.observer = {} as T;
      for (let key in this.store) {
        Object.defineProperty(this.observer, key, {
          set: (value) => {
            this.store[key] = value;
            this.pages.forEach((element: any) => {
              element.setData({
                [key]: value,
              });
            });
          },
          get: () => {
            return this.store[key];
          },
        });
      }
    }
  }
  addPage(page: any) {
    this.pages.add(page);
  }
  removePage(page: any) {
    this.pages.delete(page);
  }
  setData(key: string, value: any) {
    if(this.store[key] !== value){
      (this.observer[key] as T) = value;
    }else{
      console.log('数据未更改')
    }
  }
  getData(key: string) {
    return this.observer[key];
  }
}

export default Wex;