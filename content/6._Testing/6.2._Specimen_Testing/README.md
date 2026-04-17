---
title: 6.2. Specimen Testing
description: Gathering material data
date: 2026-4-4
author: Khaizuran Khalid
order: 2
tags: [Specimen, ASTM]
access: [0]
---

To improve simulation accuracy, material properties were obtained experimentally and implemented into the simulation environment. The rquired material inputs were derived from the following standards.

1. **ASTM D3039 on Instron 8501**
<div></div>
> Tensile Strength

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Tensile_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 45: Tensile Test Setup.</p>
</div>
</div>
</div>

The untabbed specimens are gripped with 120 grit sandpaper in the clamping jaws of the Instron 8501. The crossheads then pull the specimen till failure.

2. **ASTM D6641 on Shimadzu AT25GB**
<div></div>
> Compressive strength

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Compression_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 46: Compressive Test Setup.</p>
</div>
</div>
</div>

The specimens are flushed with the ends of the jig before being clamped down with 7nm of bolt tension. Care needs to be taken to calibrate the test parameters to ensure that the failure point lies on the gage area. Initial experiments failed to stop in time and caused multiple failure points.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Multiple_Cracks_Compression.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 46: Multiple Cracks on Specimen.</p>
</div>
</div>
</div>

3. **ASTM D7264**
<div></div>
> Flexural strength, stiffness and simulation validation

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/3_Point_Bending_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 47: 3 Point Bending Test Setup.</p>
</div>
</div>
</div>

<div></div>
<br></br>

The specimens are marked for easy alignment on the jig. The jig uses 6mm dowel pins as the contact points as specified in the standard. The crosshead then compresses and bends the specimen till failure.

As previously mentioned, the specimens were fabricated from a single panel of carbon fiber and cut with a waterjet. This reduces manufacturing variance. To note, the 3 point bending tests were done on the Instron 8501 instead of the typical Instron 8874 as the machine was in use by another project. The compiled results for the 3 layups are reflected in the figures below.

As 11ply layup is likely to be chosen for its thickness similar to that of the aluminium rims, the stock material data in Ansys is modified according to the results gathered. The highlighted cells in figure 48 marks the new values derived from the experiments. 

The material data is then used on the 3 point bending simulation to validate the material data and accuracy. The simulated results however was not accurate with a 63% error. Despite mesh improvements and different boundary conditions, this did not improve the error.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Modified_Material_Data.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 48: Modified Material Data.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/3_Point_Bending_Simulation.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: 3PB Simulation.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/3_Point_Bending_Error.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 50: 3 Point Bending Error.</p>
</div>
</div>
</div>