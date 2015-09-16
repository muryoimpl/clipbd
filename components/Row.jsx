import React from 'react';
import { RaisedButton } from 'material-ui';

export default class Row extends React.Component {
  handleSelect(e) {
    e.preventDefault();
    this.props.onSelectClick(this.props.history.id);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.onDeleteClick(this.props.history.id);
  }

  handleCopyToClipboard(e) {
    e.preventDefault();
    this.props.onCopyToClipboardClick(this.props.history.id);

    const text = this.props.history.text;
    const notificationText = text.length > 10 ? text.substr(-10) + '...' : text;
    new Notification('Copied', {body: notificationText});
  }

  render() {
    return (
      <tr>
        <td width='40%'>{this.props.history.text}</td>
        <td width='10%'>{this.props.history.chars}</td>
        <td width='10%'>{this.props.history.size}</td>
        <td width='40%'>
          <RaisedButton
            label="select"
            primary={true}
            onClick={this.handleSelect.bind(this)}
            />
          <RaisedButton
            label="delete"
            onClick={this.handleDelete.bind(this)}
            />
          <RaisedButton
            secondary={true}
            label="copy"
            onClick={this.handleCopyToClipboard.bind(this)}
            />
        </td>
      </tr>
    );
  }
}

export default Row;
