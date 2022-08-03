# phpCacheAdmin Plugin for Lando

This plugin for [Lando.dev](https://lando.dev) gives you the ability to use
[phpCacheAdmin](https://github.com/RobiNN1/phpCacheAdmin) as a service.

phpCacheAdmin is a web dashboard for your favorite caching system.

## Requirements

- [Lando v3+](https://lando.dev/)

## Installation

- [Download and extract the archive of the latest version](https://github.com/cdubz/lando-phpcacheadmin/releases);
- Move the extracted `phpcacheadmin` folder to the Lando plugins folder:

```bash
mv phpcacheadmin ~/.lando/phpcacheadmin/
```

> If the `plugins` directory doesn't exist, create it:
> ```bash
> mkdir -p ~/.lando/plugins
> ```

## Configuration

You may configure phpCacheAdmin within your Landofile, by setting a service alongside your cache services.

```yaml
name: phpcacheadmin-latest-example
recipe: lamp
config:
  webroot: .
services:
  cache1:
    type: redis
  cache2:
    type: memcached
  phpcacheadmin:
    type: phpcacheadmin:latest
    hosts:
      - type: redis
        host: cache1
      - type: memcached
        host: cache2
```

### Configuration options

Supported configurations options per host are:

#### Memcached

- `name`: The server name for an info panel, useful when you have multiple servers added (Optional, default name is Localhost)
- `host`: Memcached server host
- `port`: Memcached server port (Optional, default is 11211)

#### Redis

- `name`: The server name for an info panel, useful when you have multiple servers added (Optional, default name is Localhost)
- `host`: Redis server host
- `port`: Redis server port (Optional, default is 6379)
- `database`: Redis database (Optional, default is 0)
- `password`: Redis database (Optional, empty by default)
