# Secure Tax Docs Portal

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [DBeaver](https://dbeaver.io/) (community edition)
- [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command) (if on Windows)

## Installation

1. Clone this repository

```shell
git clone git@github.com:/cgtfarmer/tax-docs-portal.git
```

2. Build the images

```shell
docker compose build
```

## Development

1. Bring up the stack

```shell
docker compose up -d
```

2. (Optional) Tail container logs (Ctrl+C to exit)

```shell
docker compose logs -f
# OR
docker compose logs -f frontend
# OR
docker compose logs -f backend
```

3. Check if the app is working end-to-end

Test the frontend here: http://localhost

4. Bring down the stack

```shell
docker compose down
```

## References

[Connecting to the DB](https://github.com/cgtfarmer/tax-docs-portal/wiki/Connecting-to-the-DB)

[Docker Commands](https://github.com/cgtfarmer/tax-docs-portal/wiki/Docker-Reference)

[Learning References](https://github.com/cgtfarmer/tax-docs-portal/wiki/Learning-References)
