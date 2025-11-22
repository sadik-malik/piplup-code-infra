# @piplup/code-infra

Infra scripts and shared configuration for Piplup projects.

## Overview

This package provides reusable scripts and configuration for linting and formatting setup across Piplup repositories. It is designed to be used as a base for consistent code quality and tooling.

## Usage

### Install

This package is intended to be used as a dependency in your project:

```sh
pnpm add -D @piplup/code-infra
```

### Configuration

- **ESLint**: Exports a base config and helpers from `./eslint`
- **Prettier**: Exports a base config from `./prettier`
