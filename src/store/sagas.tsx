import { put, call, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "./slice";
import { Action } from "redux";
import { LayoutTypes } from "../actionTypes";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Simulate an asynchronous API call
const fetchDataFromApi = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

function* fetchData() {
  try {
    const data: Post[] = yield call(fetchDataFromApi);
    console.log(data);
    
    yield put(fetchDataSuccess(data));
  } catch (error: any) {
    yield put(fetchDataFailure(error));
  }
}

function* watchFetchData() {
  yield takeLatest<Action>(LayoutTypes.DATA_FETCH, fetchData);
}

export default watchFetchData;
