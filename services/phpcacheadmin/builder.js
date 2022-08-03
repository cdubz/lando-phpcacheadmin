'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'phpcacheadmin',
  config: {
    version: '1',
    supported: ['1', 'latest'],
    legacy: [],
    pinPairs: {
      '1': 'robinn/phpcacheadmin:1.1.0',
      'latest': 'robinn/phpcacheadmin:latest',
    },
    command: '/bin/sh -c apache2-foreground',
    confSrc: __dirname,
    hosts: [],
    remoteFiles: {
      config: '/etc/phpcacheadmin/config.php',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoPca extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Build the default stuff here
      const pca = {
        image: `robinn/phpcacheadmin:${options.version}`,
        environment: {},
        ports: ['80'],
        command: options.command,
      };

      // Add hosts environment variables.
      const indexes = {redis: 0, memcached: 0};
      const optional = ['name', 'port', 'database', 'password'];
      options.hosts.forEach(host => {
        const prefix = `PCA_${host.type.toUpperCase()}_${indexes[host.type]++}`;
        pca.environment[`${prefix}_HOST`] = host.host;

        optional.forEach(option => {
          if (host?.[option]) {
            pca.environment[`${prefix}_${option.toUpperCase()}`] = host[option];
          }
        });
      });

      // Send it downstream
      super(id, options, {services: _.set({}, options.name, pca)});
    };
  },
};
