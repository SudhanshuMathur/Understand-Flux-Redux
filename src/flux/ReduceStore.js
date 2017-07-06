import { Store } from './Store';

export class ReduceStore extends Store {

    constructor(objDispatcher) {
        console.log("ReduceStore - constructor(objDispatcher)");

        //When used in a constructor, the super keyword appears alone and must be used before the 'this'' keyword can be used. 
        //This keyword can also be used to call functions on a parent object.
        super(objDispatcher); //Call the constructor of Superiror class or Store class

        this.__history = []; //This is created to keep the history of states... required for undo action
    }

    reduce(state, action) {
        console.log("ReduceStore - reduce(state,action)");
        throw new Error("subclass must implement reduce(state,action) method of Flux Reduce Store");
    }

    __onDispatch(action) {
        console.log("ReduceStore - __onDispatch(action)");
        const newState = this.reduce(this.__state, action); //Create a copy of the sate with the passed action
        if (newState !== this.__state) //if the new state is same as old state 
        {
            //store the last state as histoy .. required for Undo action
            //Since we never mutate the state, only copy it, these copies in the history will be preserved and not altered in anyway.
            this.__history.push(this.__state);
            this.__state = newState;
            this.__emitChange(); //automatic part of notifying the listeners
        }
    }

    //It will take whatever the latest state is in the history and make that the state property..required for undo
  revertLastState() {
      console.log("ReduceStore - revertLastState()");
        if (this.__history.length > 0)
            this.__state = this.__history.pop();
        this.__emitChange();
    }
    
}