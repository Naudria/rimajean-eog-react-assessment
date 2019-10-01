import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const LastKnownMeasurement = props => {
  const { metric } = props;

  const [measurement, setMeasurement] = useState({metric});

  const classes = useStyles();

  const query = `
		query {
		  getLastKnownMeasurement(metricName: "${metric.metricName}") {
		    metric
		    value
		    unit
		    at
		  }
		}
		`;

}

export default props => {
  return (
    <Provider value={client}>
      <LastKnownMeasurement metric={props} />
    </Provider>
  );
};
