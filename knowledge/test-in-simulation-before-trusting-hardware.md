---
title: Test in simulation before you trust hardware
tags: [quality, testing]
source: "Lecture 8"
---

# Test in simulation before you trust hardware

The visiting robotics engineer's third rule: **test before you trust.** He would not risk a machine costing hundreds of thousands of dollars on a first flight without knowing how it would behave. So almost every project went through simulation first (in Gazebo, sometimes with a game engine for visuals). If he liked the result, he went ahead. If not, back to the drawing board.

Two levels of simulation testing:

- **SITL (software in the loop):** the flight-control software runs entirely on a computer against a simulated vehicle. You send commands and it behaves as the real drone would.
- **HITL (hardware in the loop):** the real flight controller board is plugged into the simulation, so the real hardware is tested without the vehicle moving.

He also mentioned testing on remote cloud simulation services, for example NVIDIA's, when you don't have the hardware locally.

In software terms this is the same as running against **mocks, emulators and staging environments** before production. Mocks are fake versions of outside services, and emulators imitate a device. You test the risky part where failure is cheap.

He added a joke engineers live by: "if it works, don't touch it." If you want to understand working code, **clone it first** and experiment on the copy.

## Use it in the capstone

In the test plan, list where each component is tested before real use (unit tests, mocked APIs, an emulator for the mobile app, staging). If we use any device, describe how we simulate it.

## Related

- [Testing stages: developer, QA, alpha, beta](testing-stages-developer-qa-alpha-beta.md)
- [Deploy demos to a staging server, not localhost](deploy-demos-to-a-staging-server.md)
- [Testing with extreme inputs](testing-with-extreme-inputs.md)
