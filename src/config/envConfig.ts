import Config from 'react-native-config';

type configKey = 'ENV_NAME' | 'API_URL';

export const getEnvConfig = (key: configKey) => Config[key];
