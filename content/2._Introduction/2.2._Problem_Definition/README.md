---
title: 2.2. Problem Definition
description: What could have been better?
date: 2025-11-12
author: Khaizuran Khalid
order: 2
tags: [Mass, rotational inertia]
access: [0]
---

## **Unchanged Rim Mass**

Over the years, design improvements have contributed to an ever lighter car. However, the rims are an off the shelf component
that has not been optimised. The rims are part of unsprung mass, a collection of components that are not supported by the vehicle's springs. A reduction in unsprung mass results in less work for the suspension to maintain traction with the ground. This allows the suspension to be more responsive to changes in road surface and maintain a more consistent grip, translating to better feel for the drivers and the ability to more consistently drive close to the limit. [1] R25e uses the 3-piece 10" FSAE CL Rims from Keizer Wheels conisting of an inner and outer barrel and a centre piece that mounts to the hub.

| Wheel Mass: 21.2kg                           | Wheel Mass: 21.2kg                           |
|----------------------------------------------|----------------------------------------------|
| R24e Mass: 217.5kg                           | R25e Mass: 199.6kg                           |
| Rim mass accounts for  **9.74%** of total mass   | Rim mass accounts for  **10.6%** of total mass   |

<div className="w-full flex items-center justify-center">
<p className="italic">Table 3: Rim mass makeup.</p>
</div>

![Mass Sensitivity Graph](/mass_v_laptime.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 3: Mass Vs Laptime Sensitivity.</p>
</div>

## **Rotational Inertia**

In addition to unsprung mass, the rims also contribute to rotational mass which affects longitudinal acceleration. Given constant rolling and aerodynamic
resistance, acceleration resistance can adversely affect a car's acceleration. As the largest rotating components, the wheels highlight the need to reduce the 
mass to improve upon mass moment of inertia.


![Rotational Inertia Equations](/Rotational_Inertia_Equations.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 4: Rotational Inertia Equation.</p>
</div>


From these equations, a decrease in the radius of gyration will also further decrease the mass moment of
inertia by a squared factor. Thus, moving this radius towards to the rotational axis can also reduce the
overall torque required to accelerate the wheels.
