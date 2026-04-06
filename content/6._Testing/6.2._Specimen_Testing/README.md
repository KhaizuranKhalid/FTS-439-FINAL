---
title: 6.2. Specimen Testing
description: Gathering material data
date: 2025-11-12
author: Khaizuran Khalid
order: 2
tags: [Specimen, ASTM]
access: [0]
---

To improve simulation accuracy, material properties were obtained experimentally and implemented into the simulation environment. The rquired material inputs were derived from the following standards.

1. **ASTM D3039**
<div></div>
> Tensile Strength

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: Tensile Test Setup.</p>
</div>
</div>
</div>

2. **ASTM D3410**
<div></div>
> Compressive strength

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: Compressive Test Setup.</p>
</div>
</div>
</div>

3. **ASTM D7264**
<div></div>
> Flexural strength and stiffness and simulation validation

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: 3 Point Bending Test Setup.</p>
</div>
</div>
</div>

<div></div>
<br></br>

As previously mentioned, the specimens were fabricated from a single panel of carbon fiber and cut with a waterjet. This reduces manufacturing variance and avoids heat affected zones. 

With the testing done, the stock material data in Ansys is modified. The values are then used on a 3 point bending simulation to validate the results. The simulated results however was not accurate with a 63% error. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: Modified Material Data.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: 3PB Simulation.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/10_ply_deform.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: Variance in error.</p>
</div>
</div>
</div>