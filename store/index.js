import { action, observable, configure  } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

configure({
    enforceActions: 'always'
});

class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable obj = {
    x: {
      xx: 1
    },
    y: 2,
  }

  constructor (isServer, initialData = {}) {
    this.init(isServer, initialData);
  }

  @action init = (isServer, initialData) => {
    this.lastUpdate = initialData.lastUpdate != null ? initialData.lastUpdate : Date.now()
    this.light = !!initialData.light
  }

  @action start = () => {
    this.timer = setInterval(this.update, 1000)
  }

  @action update = () => {
    this.lastUpdate = Date.now()
    this.light = true;
  }

}


let store = null
export function initializeStore (initialData) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store(isServer, initialData)
  }
  if (store === null) {
    store = new Store(isServer, initialData)
  }
  return store
}
