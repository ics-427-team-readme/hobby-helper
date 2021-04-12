import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';



/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StatsItem extends React.Component {

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stat.name}</Table.Cell>
          <Table.Cell>{this.props.stat.hobby}</Table.Cell>
          <Table.Cell>{this.props.stat.rating}
            <Link to={`/rating/${this.props.stat._id}`}><Icon name='star'/></Link></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StatsItem.propTypes = {
  stat: PropTypes.object.isRequired,
  StatItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StatsItem);
