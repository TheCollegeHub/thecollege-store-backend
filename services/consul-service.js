import Consul from 'consul';
const port = process.env.CORE_SERVICE_PORT || 5001;
const consulClient = new Consul({
  host: process.env.CONSUL_HOST || 'localhost',
  port: process.env.CONSUL_PORT || '8500',
  promisify: true
});

export const registerWithConsul = async () => {
  const serviceConfig = {
    id: `core-service-${port || 5002}`,
    name: 'core-service',
    address: 'localhost',
    port: parseInt(port|| 5001),
    check: {
      http: `http://host.docker.internal:${port || 5001}/health`,
      interval: '10s',
      timeout: '5s'
    }
  };

  try {
    await consulClient.agent.service.register(serviceConfig);
    console.log('✅ Registered with Consul:', serviceConfig.id);
  } catch (error) {
    console.error('❌ Consul registration failed:', error);
  }
};

export default consulClient;
