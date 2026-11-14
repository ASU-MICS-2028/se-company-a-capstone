---
title: Polymorphism and runtime binding
tags: [patterns, oop, inheritance]
source: "Lecture 11; Lecture 12"
---

# Polymorphism and runtime binding

The lecturer used this object-oriented idea to explain why Strategy (and behavioural patterns generally) "decide behaviour at runtime".

**Inheritance setup.** An abstract `Animal` class has high-level methods: `locomote()`, `respire()`, `reproduce()`. The child classes `Mammal` and `Reptile` each "are" animals (an is-a relationship), and add or **override** methods. For example, a reptile reproduces by laying eggs and sheds its skin, while a mammal breastfeeds. Further down, `Goat` extends `Mammal` and `Snake` extends `Reptile`.

**Runtime binding.** In Java:

```java
Animal goat = new Goat();
goat.reproduce();
```

The variable is declared as `Animal`, but the object is a `Goat`. *Which* `reproduce()` runs (the parent's or the overriding child's) is resolved **at runtime** from the actual object. That is **polymorphism**: one call, many forms.

**The house analogy.** "John's house" could mean the house he inherited from his parents or the one he built. If John has built his own, his own is used. Otherwise he can still use the inherited one. A child class uses the parent's method unless it overrides it.

## Use it in the capstone

Use interfaces and overriding to keep our intelligent components swappable (Strategy). Show the inheritance clearly in class diagrams.

## Related

- [Strategy pattern](strategy-pattern.md)
- [UML is-a relationships](uml-is-a-relationships.md)
