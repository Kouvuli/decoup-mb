# Shared mobile code

contracts, api-client and ui are empty public entrypoints. They must not import feature modules or the app shell. Do not use a shared folder to hide business orchestration. Share reviewed versioned contracts with decoup-web when real contracts exist, not direct sibling-source imports.
