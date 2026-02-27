# Secure Tax Docs Portal

## Summary
This application is a Proof-of-Concept for a tax documentation portal. When the application is complete, it will be a web-based platform for customers of Tax Strategists of America to communicate with their assigned accountants. The platform gives clients the ability to upload tax documents and receipts for their accountants to review, as well as to communicate directly with their accountants. When it is running, it can be accessed via the browser. More details will be provided here as the application is developed.

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

Test the frontend here: http://localhost:5173

4. Bring down the stack

```shell
docker compose down
```

## References

[Connecting to the DB](https://github.com/cgtfarmer/tax-docs-portal/wiki/Connecting-to-the-DB)

[Docker Commands](https://github.com/cgtfarmer/tax-docs-portal/wiki/Docker-Reference)

[Learning References](https://github.com/cgtfarmer/tax-docs-portal/wiki/Learning-References)

## Release Notes
2026-02-26 - Application stack, initial database functionality, and preliminary Playwright tests are functional.
