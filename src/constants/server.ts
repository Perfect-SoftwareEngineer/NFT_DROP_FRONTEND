import { backendStaging, backendProduction } from '../../lib/constants';

const SERVER_URL = process.env.NEXT_PUBLIC_ENV === 'production' ? backendProduction : backendStaging;

export default SERVER_URL;
