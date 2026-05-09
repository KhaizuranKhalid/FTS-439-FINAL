---
title: 6.5. Apparatus Deflection 
description: Is the apparatus too compliant?
date: 2026-4-4
author: Khaizuran Khalid
order: 5
tags: [Apparatus]
access: [0]
---

Given the evidence pointing towards experimental error, an investigation on the testing apparatus was conducted on both Instron 8874 and 8501. The objective was to compare the indicated crosshead displacement by the apparatus and the actual displacement as measured by dial gauges. The Instron 8874 had an error of 1.86% and 3.06% when loaded and free respectively. The Instron 8501 had a no load error of 41%. Additionally, the Instron 8501 exhibited oscillatory crosshead motion of approximately 0.25mm when holding displacement. At maximum deflection, this oscillation alone corresponds to 16.63% of the expected displacement, significantly affecting measurement accuracy. No loaded test was conducted on the Instron 8501 as the jig was in use by another project.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8874_Load_Deflection_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 62: Instron 8874 Load Test Setup.</p>
</div>
</div>
</div>


<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8874_No_Load_Deflection_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 63: Instron 8874 No Load Test Setup.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8874_Load_Data.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 64: Instron 8874 Load Deflection Data.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8874_No_Load_Data.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 65: Instron 8874 No Load Deflection Data.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8501_No_Load_Deflection_Test_Setup.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 66: Instron 8501 No Load Deflection Test Setup.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8501_No_Load_Data.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 67: Instron 8501 No Load Deflection Test Data.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8501_Top_Oscillation.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 68: Oscilating Movement 1.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Instron_8501_Bottom_Oscillation.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 69: Oscilating Movement 2.</p>
</div>
</div>
</div>

The Instron 8501 is deemed inaccurate since it has a basic error of 52%. The Instron 8874 on the other hand has a small variance between indicated and actual displacements. It is possible that the compliance is dominant in the lower portion of the jig, dial gauges should have been deployed to check on this displacement. It is also possible that the contact points experienced elastic deformation that contributed to additional displacement of the applicator that is not replicated in the simulation. 

To supplement these findings, manual calculation of the displacement according to strain data captured during the experiments were also gathered below.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Strain_Data_Tension.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 70: Strain Elongation.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Strain_Data_Comp.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 71: Strain Compression.</p>
</div>
</div>
</div>

Based on the data above, the strain displacements are vastly different from the simulated and experimental displacement values. The largest elongation calculated is 0.05mm while the simulated elongation is 1.16mm.  This is off by a factor of 23. This is also true for the compression displacements. Additionally, the blanks in the data is due to dirty data. Despite careful application of the strain gauges, there is large oscilations of strain data. This can be seen in the figure below. This is worse for the compression specimens due to the dense footprint of the rosette type strain gauge. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Strain_Graph.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 72: Strain Graph.</p>
</div>
</div>
</div>

With various data highlighting different points of error, the large concern stems from inaccuracy in displacement data collection. This makes data validation difficult when comparing the experimental values with simulated ones. As such, future simulations would not provide acceptable results before building a prototype.