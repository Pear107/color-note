class StoreFactory{
  store: undefined | Store
  constructor(store: any){
    if(this.store === undefined){
      this.store = new Proxy(
        store,{
          set: function(target, property: string, value){
            console.log('set')
            if(property in target){
              target[property] = value
              return value
            }else{
              throw new ReferenceError("property \"" + property + "\" dose not exist.")
            }
          },
          get: function(target, property: string, value){
            console.log('get')
            if(property in target){
              return value
            }else{
              throw new ReferenceError("property \"" + property + "\" dose not exist.")
            }
          }
        }
      )
    }
  }
}
export default StoreFactory