---
title: Model–View–Controller (MVC)
tags: [architecture, patterns]
source: "ICP Lab 4 (Part B); Ashesi CSIS Capstone Design Patterns & DS&A deck (integrated design stack)"
---

# Model–View–Controller (MVC)

**MVC** is an architectural pattern that splits an interactive program into three parts:

- **Model:** data and business rules (for example, users and the password check against a database). It knows nothing about screens.
- **View:** what the user sees (the login form). It displays model data and passes user actions on.
- **Controller:** handles input. It takes the user's action from the view, calls the model, and decides which view updates.

Lab 4 had students refactor a Java GUI login example into Model (4 pts), View (4), Controller (4) and **"glue"** (3): the small piece of code that creates the three and wires them together. Comments had to explain the MVC role of each part.

Benefits: you can change the UI without touching business logic, test the model without a GUI, and work in parallel. The deck lists MVC alongside layered and microservices as architecture styles to pick by quality attributes.

## Use it in the capstone

State our style in the architecture doc. A web app is usually MVC or layered (frontend view, API controller, services and model). Justify it under "programming model justification".

## Related

- [ICP Lab 4: threads and MVC](icp-lab-4-threads-and-mvc.md)
- [Facade pattern](facade-pattern.md)
- [Observer pattern](observer-pattern.md)
