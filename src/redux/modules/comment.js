import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import { apis } from "../../shared/axios";

//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//action create function
const setComment = createAction(SET_COMMENT, (meetingId, comment_list) => ({meetingId, comment_list}));
const addComment = createAction(ADD_COMMENT, (meetingId, comment) => ({meetingId, comment}));
const editComment = createAction(EDIT_COMMENT, (meetingId, comment) => ({meetingId, comment}));
const delComment = createAction(DEL_COMMENT, (meetingId) => ({meetingId}));

// 초기값
const initialState = {
  list:{},
};

// 미들웨어

const addCommentAction = (meetingId, content) => {

  return function(dispatch, getState, {history}){
    apis.createComment(meetingId, content)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
}
};

const delCommentAction = (meetingId, commentId) => {
  return function(dispatch, getState, {history}){
    apis.delCommentDB(meetingId, commentId)
      .then((response) => {
        console.log(response)
        document.location.reload('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


// 리듀서
export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.meetingId] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.meetingId].unshift(action.payload.comment)
      }),
      // [EDIT_COMMENT]: (state, action) => produce(state, (draft)=> {
      //   draft.list[action.payload.post_id].unshift(action.payload.comment)
      // }),
      [DEL_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.meetingId].filter((p,i) => p.id !== action.payload.meetingId)
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  addCommentAction,
  delCommentAction,
};

export { actionCreators };