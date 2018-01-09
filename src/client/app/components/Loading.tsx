import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

/** Loading Component */
const Loading = (props: LoadingComponentProps) => {
  if (props.error) {
    return <div>Error!</div>;
  }
  return <div>Loading...</div>;
};

export default Loading;
