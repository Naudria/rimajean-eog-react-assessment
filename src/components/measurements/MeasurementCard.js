import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import LastKnownMeasurement from './LastKnownMeasurement'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const query = `
query{
  getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <MeasurementCard />
    </Provider>
  );
};

const MeasurementCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title="EOG FIELD EQUIPMENT" />
      <CardContent>
        <MetricSelect />
      </CardContent>
    </Card>
  );
};