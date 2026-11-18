---
title: A CDN speeds up delivery but does not secure it
tags: [architecture, quality]
source: "Lecture 14"
---

# A CDN speeds up delivery but does not secure it

A content delivery network (CDN) keeps copies of large or static content (images, video, scripts) on servers close to users. In the WhatsApp walkthrough the lecturer listed the benefits: faster media loading, availability everywhere, support for caching, lower bandwidth and hosting costs. He said every web application should sit behind one.

A CDN is a pipe, not a lock. It is **not secure by default**: a student described paywalled images and videos that anyone could download straight from the CDN links. Access control (signed URLs, authentication on the request) has to be added by the developer.

Related terms from the same lecture:
- **Blob store:** storage for objects as raw binary (media files, serialised objects). Streaming services keep their media in blob stores and serve it through the CDN.
- **Streaming protocols:** WebRTC, HLS and RTMP are the common choices over plain UDP.

## Use it in the capstone

The Twɛn frontend is a static Vite build, so it can be served from a CDN-backed static host. Nothing patient-related is ever a public static file: ticket and wait data come only from the authenticated API.

## Related

- [Caching and PWA for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Load balancing](load-balancing.md)
