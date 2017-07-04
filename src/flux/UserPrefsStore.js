import {
    Store
} from './Store'

export class UserPrefsStore extends Store {

    //inherited method from base class Store- getInitialState()
    getInitialState() {
        console.log("UserPrefsStore - getInitialState()");
        return localStorage['userPreferences'] ? JSON.parse(localStorage['userPreferences']) :
        {
            userName: "Jim"
        };
    }

    //inherited method from base class Store- getInitialState()
    __onDispatch(objAction) {
        console.log("UserPrefsStore - __onDispatch(objAction)");

        switch (objAction.type) {
            case "UPDATE_USERNAME":
                this.__state.userName = objAction.value;
                this.__emitChange();
                break;
        }
    }

    //new method of the class
    getUserPreferences(){
        return this.__state;

    }
}