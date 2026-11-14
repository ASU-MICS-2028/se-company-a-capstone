---
title: Composite pattern
tags: [patterns, structural, composite]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Composite pattern

**Composite** is a structural Gang of Four pattern. It arranges objects in a **tree** that represents a part-whole hierarchy, so the client can treat a single object and a group of objects the same way.

**Example: cafeteria menu.** You can order single items (jollof, chicken, a drink), a *pack* (jollof + chicken + drink), or a *combo* made of packs. Without Composite, checkout code must keep asking "is this a single item, a pack, or a pack inside a pack?" That is **type checking**, plus summing prices by hand (**looping by hand**). The code becomes hard to read, and any missed case is a bug.

**Roles:**

- **Component:** the shared interface for everything in the tree (for example `price()`).
- **Leaf:** an object with no children (a single item).
- **Composite:** an object that holds children and adds up their results (a pack or combo).
- The **client** works only through the Component interface.

A real example: a folder's size. You ask the folder, and it sums its files and subfolders, without asking what each one is.

Cost: visiting every item once is O(n).

**Lecturer's point:** if an object has no children and no relationships (no parents, siblings or descendants), Composite makes no sense. Structural patterns assume you know the full set of relationships between your objects.

## Use it in the capstone

Use Composite when our domain has nested groups (bundles of services, regions containing districts, a curriculum containing modules) that need one shared operation such as total, count or render.

## Related

- [Chain of Responsibility pattern](chain-of-responsibility-pattern.md)
- [Decorator pattern](decorator-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a university org chart where departments, units and staff are treated uniformly through one interface. Key rule: leaf and composite share the same component interface.

**African example:** administrative regions (region → district → community) in a health or agriculture dashboard, each answering `totalCases()`.
