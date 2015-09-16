import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import * as Actions from '../actions/actions';
import Row from '../components/Row';

//material-ui
import * as mui from 'material-ui';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from 'material-ui';

const ThemeManager = new mui.Styles.ThemeManager();
const Colors = mui.Styles.Colors;

export default class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  handleChange(e) {
    this.clipboards.setState({historyText: e.target.value})
  }

  render() {
    const {histories, selected, historyText, dispatch} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    const textareaStyle = { width: '100%', height: '100px' };

    return (
      <div>
        <Table
          fixedHeader={true}
          fixedFooter={true} >
          <TableHeader
            adjustForCheckbox={false}
            enableSelectAll={false}
            displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn width='40%' tooltip='text'>Text</TableHeaderColumn>
              <TableHeaderColumn width='10%' tooltip='chars'>Chars</TableHeaderColumn>
              <TableHeaderColumn width='10%'  tooltip='size'>Size</TableHeaderColumn>
              <TableHeaderColumn width='40%'> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {histories.map(history =>
              <Row
                history={history}
                key={history.id}
                onSelectClick={() =>
                  dispatch(actions.selectHistory(history.id))
                }
                onDeleteClick={() =>
                  dispatch(actions.deleteHistory(history.id))
                }
                onCopyToClipboardClick={() =>
                  dispatch(actions.copyHistoryToClipboard(history.id))
                }
              />
            )}
          </TableBody>
        </Table>
        <hr />
        <textarea
          style={textareaStyle}
          onChange={(e) =>
            dispatch(actions.changeHistoryText(e.target.value))
          }
          value={historyText}
          >
        </textarea>
      </div>
    );
  }
}

App.childContextTypes = {muiTheme: React.PropTypes.object};

export default connect(state => {
  return {
    selected: state.clipboards.selected,
    histories: state.clipboards.histories,
    historyText: state.clipboards.historyText
  }
})(App);
