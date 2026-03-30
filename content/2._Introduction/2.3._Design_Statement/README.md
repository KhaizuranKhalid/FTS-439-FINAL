---
title: 2.3. Design Statement
description: What are our constraints?
date: 2025-11-12
author: Khaizuran Khalid
order: 3
tags: [Stakeholders, design specs]
access: [0]
---

## **Stakeholders**

The following key stakeholders have been identified:
<div></div>

1. **FSAE Judges**
<div></div>
Ultimately, FSAE is a competition and the car has to be rule compliant. Should we fail to meet the demands of the FSAE judges, we 
are forfeited from the competition and our efforts would be futile. Although there are no rules dictating the material and construction 
of the rims, the judges are interested to know the design processes and decisions in material and construction selection as a part of their DRB process.

![FSAE Wheel Rules 2026](/Wheel_rules.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 5: FSAE 2026 Wheel Rules.</p>
</div>

Value proposition: Design choices backed by data and testing.

2. **Suspension Department**
<div></div>
Should there be major deviations to the geometric design of the rim, the suspension department will need to adjust their geometry. As the rim goes
around their sub-assemblies, the internal area should remain clear to prevent damage within the wheel wells. 

![Wheel Well Space](/Wheel_well_internal.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 6: Wheel Assembly.</p>
</div>

<div></div>
Value proposition: A lighter rim that fits the car.

3. **Drivers**
<div></div>
Drivers pilot the car and work at their limits. Their feedback is crucial in further tuning and optimising the car to 
maximise performance. The key attributes that allow the drivers to push their limits is a car that is easy to handle and has light steering.

![Driving in skidpad](/MIS_Skidpad.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 7: Skidpad Event.</p>
</div>

<div></div>
Value proposition: Responsive and predictable car.


## **Design Specifications**
1. Ensure strength of CF rims is comparable to aluminium rims (Demand)
<div></div>
> To ensure safety of the driver as well as the car, the aluminium rims are a benchmark for us to base the load cases on.

2. Ensure rims are rule compliant (Demand)
<div></div>
> To ensure the car will be cleared for the competition.

3. Use existing moulds to reduce cost (Demand)
<div></div>
> To reduce starting cost of the project.

4. Reduce overall weight of each rim by 10% (Demand)
<div></div>
> To ensure the effectiveness of the solution.

5. Create a test jig that is flexible in its loading conditions (Wish)
<div></div>
> To provide flexibility in real loading conditions.

6. Increase stiffness of rim to increase camber compliance (Wish)
<div></div>
> To increase the sensitivity of the car and more responsive for the drivers.

## **Design Statement**
Design and Implement carbon fiber rims to reduce wheel mass by 10% while maintaining cost-effectiveness.