import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

/** Loading Component */
const Loading = (props: LoadingComponentProps) => {
  if (props.error) {
    return <div>Error!</div>;
  }
  if (props.timedOut) {
    return <div>Taking a long time...</div>;
  }
  if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  return null;

};

export default Loading;
