import * as Types from '../constant/ActionTypes';

export function selectHistory(id) {
  return { type: Types.SELECT_HISTORY, id }
}

export function deleteHistory(id) {
  return { type: Types.DELETE_HISTORY, id }
}

export function copyHistoryToClipboard(id) {
  return { type: Types.COPY_HISTORY_TO_CLIPBOARD, id }
}

export function changeHistoryText(text) {
  return { type: Types.CHANGE_HISTORY_TEXT, text}
}
