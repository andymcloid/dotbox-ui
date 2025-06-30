# Gemini Project Context

This document provides context for the Gemini AI assistant.

## Primary Source of Truth

All project conventions, architecture, and development guidelines are documented in **`CONTRIBUTING.md`**.

Before making any changes, please thoroughly review `@CONTRIBUTING.md` to understand:

-   The component architecture and dual API (Web Components + JS) requirement.
-   The automatic build and documentation system.
-   Styling guidelines (CSS variables only).
-   The mandatory `component.json` file for each component.
-   The "For AI Assistants" section for a summary of critical rules.

## Development Server

The documentation server can be run on a specific port for testing purposes. This is useful when the default port (3000) is already in use.

-   To run the server on a different port, use the `--port` flag:
    ```bash
    npm run docs -- --port 8000
    ```

This command is particularly useful for AI assistants to avoid conflicts with a developer's running instance of the documentation server.

After implementing changes, fixing bugs, or adding features, it is crucial to update the **`CONTRIBUTING.md`** file. This ensures that the project's documentation stays current, prevents the reintroduction of fixed issues, and captures new architectural patterns or component guidelines.