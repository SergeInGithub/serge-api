const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Blog api',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          jwt: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          jwt: []
        }
      ],
      swagger: '3.0'
    },
    apis: ['./api/routes/*.js']
  }

const swaggerSpec = swaggerJsdoc(options)

module.exports = function swaggerDocs(app, port) {
    // swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

