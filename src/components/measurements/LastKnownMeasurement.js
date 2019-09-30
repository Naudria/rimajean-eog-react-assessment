import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const LastKnownMeasurement = props => {
  const { metric } = props;

  const [measurement, setMeasurement] = useState({metric});

}

export default props => {
  return (
    <Provider value={client}>
      <LastKnownMeasurement metric={props} />
    </Provider>
  );
};
