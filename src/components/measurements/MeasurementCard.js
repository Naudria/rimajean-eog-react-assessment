import React, { useEffect, useState } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import LastKnownMeasurement from './LastKnownMeasurement'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginLeft: 50,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: 120
  },
  select: {
    width: 400,
  },
  card: {
    textAlign: 'center',
    margin: '5%'
  }
}));

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

const MetricSelect = () => {
  const classes = useStyles();

  const [metrics, setMetrics] = useState();

  const [selectedMetric, setSelectedMetric] = useState('');

  const dispatch = useDispatch();

  const [result] = useQuery({
    query
  });

  const { fetching, data, error } = result;

  const handleChange = event => {
    setSelectedMetric(event.target.value);
  };

  useEffect(() => {
    if (error) {
      dispatch({
        type: actions.API_ERROR,
        error: error.message
      });
      return;
    }
    if (!data) return;
    const metricData = Object.values(data.getMetrics);
    setMetrics(metricData);
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (

    <form className={classes.root}>
        
      <FormControl classess={classes.formControl}>
        <InputLabel htmlor="metric-select">Choose Metric</InputLabel>
        <Select
          className={classes.select}
          value={selectedMetric}
          inputProps={{
            name: 'metric',
            id: 'metric-select'
          }}
          onChange={handleChange}
        >
          {metrics
            ? metrics.map((metric, index) => (
                <MenuItem value={metric} key={index}>
                  {metric}
                </MenuItem>
              ))
            : null}
        </Select>
        <LastKnownMeasurement metricName={selectedMetric} />
      </FormControl>
      <MeasurementChart metricName={selectedMetric} />
          
    </form>
  );
};

