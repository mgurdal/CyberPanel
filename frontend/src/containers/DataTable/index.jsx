import { connect } from 'react-redux';
import { selectUsers } from '../../actions/userActions';
const ReactDataGrid = require('react-data-grid');
const React = require('react');


class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this._columns = props.columns
    this._rows = props.rows;
    this.state = {
      selectedRows: props.users.selectedUsers || []
    };
  }

  rowGetter = (index) => {
    return this._rows[index];
  };

  onRowSelect = (rows) => {
    this.props.dispatch(selectUsers(rows));
  };

  onCellSelected = ({ rowIdx, idx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  onCellDeSelected = ({ rowIdx, idx }) => {
    if (idx === 2) {
      alert('the editor for cell (' + rowIdx + ',' + idx + ') should have just closed');
    }
  };

  render() {
    const rowText = this.props.users.selectedUsers.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        <span>{this.props.users.selectedUsers.length} {rowText} selected</span>
        <ReactDataGrid
          ref={ node => this.grid = node }
          rowKey="id"
          minHeight={400}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          enableRowSelect="multi"
          onRowSelect={this.onRowSelect}
          onCellSelected={this.onCellSelected}
          onCellDeSelected={this.onCellDeSelected} />
      </div>);
  }
}
const mapStateToProps = state => {
    return {
      users : state.users
    }
}

export default connect(
  mapStateToProps
)(DataTable)
