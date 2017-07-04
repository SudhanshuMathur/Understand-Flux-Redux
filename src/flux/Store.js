
export class Store {

    constructor(objDispatcher) {
        console.log("Store - constructor(objDispatcher)");

        this.__cbStoreListeners = [];
        this.__state = this.getInitialState();

        //console.log("Store - constructor(objDispatcher) - this");
        //console.log(this); //here this => object UserPrefsStore
        //console.log("Store - constructor(objDispatcher) - this.__onDispatch");
        //console.log(this.__onDispatch);//here it will return _onDispatch() method implemented inside UserPrefsStore class
        //console.log("Store - constructor(objDispatcher) - this.__onDispatch.bind(this)");
        //console.log(this.__onDispatch.bind(this));//here it will return a COPY of _onDispatch() method implemented inside UserPrefsStore class
       
        this.__cbDispatcherListener = this.__onDispatch.bind(this);
        objDispatcher.register(this.__cbDispatcherListener);
    }

    getInitialState() {
        console.log("Store - getInitialState()");
        throw new Error("subclass must ovveride getInitialState() method");
    }

    addListner(cbStoreListener)
    {
        console.log("Store - addListner(cbStoreListener)");
        this.__cbStoreListeners.push(cbStoreListener);
    }

    __onDispatch() {
        console.log("Store - __onDispatch()");
        throw new Error("subclass must ovveride __onDispatch() method");
    }

    __emitChange(){
        console.log("Store -  __emitChange()");
        this.__cbStoreListeners.forEach(cbStoreListener=>cbStoreListener(this.__state));

    }
}