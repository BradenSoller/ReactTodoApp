import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

 function* getAllTodos() {
        try {
          const response = yield axios({
            method: "GET",
            url: "/api/todo",
          });
          yield put({
            type: "SET_TODOS",
            payload: response.data,
          });
        } catch (error) {
          console.log("Unable to get pending events from server", error);
        }

 }

 function* postTodos(action) {
    console.log("boo", action.payload);
    try {
      const response = yield axios({
        method: "POST",
        url: "/api/todo",
        data: action.payload
      });
      yield getAllTodos()
    }
    catch (error) {
        console.error('Shelf POST failed:', error)
    }
  }


export default function* TodoSaga() {
    yield takeLatest("FETCH_ALL_TODOS", getAllTodos),
    yield takeLatest("POST_TODOS", postTodos)

   }