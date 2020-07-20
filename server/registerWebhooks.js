const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const { registerWebhook } = require('@shopify/koa-shopify-webhooks');

const { HOST } = process.env;

const webhooks = [
  {
    topic: 'PRODUCTS_CREATE',
    address: `${HOST}/webhooks/products/create`,
  },
  {
    topic: 'PRODUCTS_UPDATE',
    address: `${HOST}/webhooks/products/update`,
  },
  {
    topic: 'CUSTOMERS_CREATE',
    address: `${HOST}/webhooks/customers/create`,
  },
  {
    topic: 'CUSTOMERS_UPDATE',
    address: `${HOST}/webhooks/customers/update`,
  },
];

const registerWebhooks = async (accessToken, shop) => {
  webhooks.forEach(async webhook => {
    const registration = await registerWebhook({
        topic: webhook.topic,
        address: webhook.address,
        accessToken,
        shop,
        apiVersion: ApiVersion.July20
      });
    
      if (registration.success) {
        console.log(`Successfully registered webhook for topic ${webhook.topic}!`);
      } else {
        console.log('Failed to register webhook', JSON.stringify(registration));
      }
  })
  
}

module.exports = registerWebhooks;
