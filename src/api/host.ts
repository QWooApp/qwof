const HOST = "http://localhost:8000";

const configureEndpoint = (endpoint: string) => `${HOST}/api/v1/${endpoint}`;

export default configureEndpoint;
