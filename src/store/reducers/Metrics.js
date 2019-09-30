const metricsReceived = metric => {
	return {
		type: 'METRICS_RECEIVED',
		payload: metric
	}
}

export default metricsReceived