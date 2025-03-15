import { all, fork } from 'redux-saga/effects'
import userSaga from './user/userSaga'

const rootSaga = function* () {
    yield all([
        fork(userSaga)
    ])
}

export default rootSaga