export class Dispatcher {

    constructor() {
        console.log("Dispatcher - constructor()");          
        this.__cbDispatcherListeners = [];
    }

    register(cbDispatcherListener) {
        console.info('Dispatcher - register(cbDispatcherListener)');
        //console.info(this);     // here this => Dispatcher class
        //console.info(cbDispatcherListener); // here cbDispatcherListener => onDispatch(action) method (bound function) of the child class UserPrefStore 
        this.__cbDispatcherListeners.push(cbDispatcherListener);
    }

    dispatch(objAction) {
        console.info('Dispatcher - dispatch(objAction)');
        //console.info(action);
        this.__cbDispatcherListeners.forEach(cbDispatcherListener => cbDispatcherListener(objAction));
    }
}