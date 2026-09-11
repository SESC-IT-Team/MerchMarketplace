---
name: medusa-development
description: "Use when building, extending, debugging, or reviewing a Medusa.js v2 application, especially marketplace features, modules, API routes, workflows, data models, module links, subscribers, admin customizations, storefront integrations, or Medusa Cloud deployment. Consult the Medusa MCP server and official docs before relying on framework APIs."
disable-model-invocation: false
---

# Medusa.js v2 Development

## Source of truth

- Use the `medusa` MCP server for current Medusa documentation and curated implementation guides.
- Prefer Medusa v2 documentation and APIs. Do not assume v1 patterns are compatible.
- Confirm the installed package versions and existing project conventions before adding code.

## Marketplace workflow

1. Identify the bounded contexts involved: product, cart, customer, order, inventory, fulfillment, payment, sales channel, or a custom vendor module.
2. Model custom data in a module. Use module links for relationships between custom records and Medusa commerce records.
3. Put multi-step business logic in workflows with compensation for external or reversible side effects.
4. Use API routes as thin adapters: validate input, resolve dependencies from the container, invoke workflows/services, and return explicit responses.
5. Use subscribers for event-driven integrations and scheduled jobs for periodic synchronization.
6. Keep vendor isolation, authorization, idempotency, and transaction boundaries explicit.

## Implementation rules

- Reuse core modules and workflows where they provide the required behavior; extend them only when necessary.
- Resolve services and modules through the Medusa container rather than constructing them directly.
- Validate request bodies and query parameters at the API boundary.
- Keep secrets and environment-specific values in environment variables.
- Add focused unit or integration tests for workflows, API routes, modules, and event handlers.
- Run the project's package-manager checks, typecheck, lint, and relevant tests after changes.

## Verification checklist

- Confirm the implementation matches the current Medusa docs through MCP.
- Check migrations and generated types when a data model changes.
- Test success, validation failure, authorization failure, duplicate/retry, and downstream failure paths.
- For marketplace flows, verify that one vendor cannot access another vendor's products, inventory, orders, or payouts.

## Useful official references

- https://docs.medusajs.com/learn/fundamentals/modules
- https://docs.medusajs.com/learn/fundamentals/workflows
- https://docs.medusajs.com/learn/fundamentals/module-links
- https://docs.medusajs.com/resources/recipes/marketplace/examples/vendors
