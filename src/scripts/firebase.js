import firebase from 'firebase';
import sectionModel from './models/section';
import todoModel from './models/todo';

let database;

export const init = () => {
    const config = {
        apiKey: 'AIzaSyBlH58bI5ixQzDaic_eS-2zXL5mczwjRaU',
        authDomain: 'todo-list-4d153.firebaseapp.com',
        databaseURL: 'https://todo-list-4d153.firebaseio.com',
        projectId: 'todo-list-4d153',
        storageBucket: 'todo-list-4d153.appspot.com',
        messagingSenderId: '686587189922'
    }
    firebase.initializeApp(config);
    database = firebase.database();
};

export const getSectionListDB = () => database.ref('/').once('value');

export const getTodoListDB = (sectionId) => database.ref(`/${sectionId}`).once('value');

export const addSection = (name) => {
    const key = database.ref('/').push().key;
    const model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP);
    return database.ref('/' + key).set(model);
}

export const addTask = (sectionId, name) => new Promise((resolve, reject) => {
    database.ref(`/${sectionId}`).once('value')
        .then((section) => {
            const tasks = section.val().tasks || [];
            const key = database.ref(`/${sectionId}`).push().key;
            tasks.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP));
            database.ref(`/${sectionId}/tasks`).set(tasks)
                .then( res => {resolve(res)})
                .catch( error => {reject(error)});
        });
});

