---
title: Proxy pattern
tags: [patterns, structural, security, proxy]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck (named only); summary from Gamma et al. 1994"
---

# Proxy pattern

**Proxy** is a structural Gang of Four pattern. A stand-in object sits in front of the real one and **controls access** to it. Calls go through the proxy, which can check, limit or add to them before forwarding.

**Example: chatbot calling cloud AI APIs.** A `ModelProxy` implements the same `generate` interface as the real model client, and adds:

- **Rate limiting:** caps how many requests reach the provider.
- **Caching:** common questions get a stored answer, with no API call.
- **Secret key handling:** the proxy attaches the API key on a server, so the app never stores the key, which would be unsafe.

The analogy is a receptionist who controls who gets in to see the CEO.

The full path: chat assistant → strategy picks the model → proxy (limits, cache, key) → cloud provider.

**Why structural?** To reach the main server, you have to pass through a layer in the structure. Skip such checks and you get breaches like the crypto exchange hack.

**How it differs from its neighbours:**

- **Adapter** changes an interface.
- **Decorator** adds behaviour.
- **Proxy** guards access (and may add checks on the call).

The lecturer also promised a diagram on *where* to place a CDN, a proxy server and a load balancer, and why.

## Use it in the capstone

If our system calls a hosted AI model, route the calls through a backend proxy that holds the key, caches and rate-limits. This is both a security NFR and a cost control on free tiers.

## Related

- [Strategy pattern](strategy-pattern.md)
- [Adapter pattern](adapter-pattern.md)
- [Decorator pattern](decorator-pattern.md)
- [Cache-aside pattern](cache-aside-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck lists Proxy but does not describe it.

**African example:** a caching proxy in front of a weather API for a farmers' advisory app, serving the last forecast when the connection drops. This is an availability argument. See [Caching strategies and eviction](caching-strategies-and-eviction.md).
