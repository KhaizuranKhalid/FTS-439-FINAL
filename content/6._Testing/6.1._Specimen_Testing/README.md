---
title: 6.1. Specimen Testing
description: Gathering material data
date: 2025-11-12
author: Khaizuran Khalid
order: 1
tags: [Specimen, ASTM]
access: [0]
---

To have an accurate simulation, Ansys requires a set of defined values. With accurate material data, the simultions can provide a more accurate result for analysis.

<div className="flex gap-6 justify-center items-center">
<div>
![](/CF_properties.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 40: Generic Wet Fabric Properties.</p>
</div>
</div>
</div>

The core of these properties can be achieved with the following tests:

1. **ASTM D3039**
<div></div>
> Tensile Strength

2. **ASTM D3410**
<div></div>
> Compressive strength

3. **ASTM D7264**
<div></div>
> Flexural strength and stiffness and simulation validation

<div></div>
<br></br>
The specimens were fabricated from a single sheet of carbon and the individual testing coupons were cut with a waterjet.This minimises the variance between manufacturing and provides a more consistent result. Waterjet is chosen to minimise any heat affected zone since vacuum infusion carbon fiber is not as resistant to heat as prepreg carbon fiber. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: Laying of panel for specimen.</p>
</div>
</div>

<div>
![=x400](/10_ply_stress.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 42: DXF for specimens.</p>
</div>
</div>
With the testing done, the stock material data in Ansys is modified. The values are then used on a 3 point bending simulation to validate the results. The results however was not accurate and resulted in a xx% error. 