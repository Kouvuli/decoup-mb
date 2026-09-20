# Mobile domains

Identity, marketplace, order, booking, payment, shipping, chat, notification, media and search are empty boundary placeholders, not implemented features or future microservices.

The app shell composes domain public index.ts entrypoints. Each module owns its internal/ directory; other modules may not import it or any peer module. Share only platform-neutral contracts/helpers or reviewed native adapters. Business authority stays in decoup-be.
