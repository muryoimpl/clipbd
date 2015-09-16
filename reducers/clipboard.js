import uuid from 'uuid';
import _ from 'underscore';
import * as Types from '../constant/ActionTypes';

const initialState = {
  selected: '',
  histories: [
    {
      id: uuid.v4(),
      text: 'abcdef',
      chars: 6,
      size: 6
    },
    {
      id: uuid.v4(),
      text: '1234567890\n123456789',
      chars: 20,
      size: 20
    },
    {
      id: uuid.v4(),
      text: '新しい朝が来た。希望の朝だ。',
      chars: 14,
      size: 28
    },
    {
      id: uuid.v4(),
      text: 'あいうえおっすおっす',
      chars: 10,
      size: 20
    }
  ]
};

export default function clipboards(state = initialState, action) {
  switch(action.type) {
  case Types.SELECT_HISTORY:
    return {
      selected: action.id,
      histories: state.histories,
      historyText: _.find(state.histories, history => history.id === action.id).text
    };
  case Types.DELETE_HISTORY:
    return {
      selected: '',
      histories: state.histories.filter(history => action.id !== history.id),
      historyText: ''
    };
  case Types.COPY_HISTORY_TO_CLIPBOARD:
    return {
      selected: action.id,
      histories: [
        _.find(state.histories, history => history.id === action.id), ...state.histories.filter(history => history.id !== action.id)
      ],
      historyText: _.find(state.histories, history => history.id === action.id).text
    };
  case Types.CHANGE_HISTORY_TEXT:
    return {
      selected: '',
      histories: state.histories,
      historyText: action.text
    }
  default:
    return state;
  }
}
