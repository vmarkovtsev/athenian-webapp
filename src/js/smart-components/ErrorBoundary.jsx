import React from 'react';
import classnames from 'classnames';

import development, { isNotProd } from 'js/components/development';

import { reportToSentry } from 'js/services/api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }

  static getDerivedStateFromError(err) {
    return { err };
  }

  componentDidCatch(err, stack) {
    reportToSentry(err, { extra: { stack: stack.componentStack } });
  }

  render() {
    if (this.state.err) {
      return (
        <div
          className={classnames('d-inline-block p-1', development.errorBoxClass)}
          title={this.state.err.toString()}
        >
          {isNotProd && 'error'}
        </div>
      );
    }

    return this.props.children;
  }
}
