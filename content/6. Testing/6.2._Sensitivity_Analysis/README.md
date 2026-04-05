---
title: 6.2. Sensitivity Analysis
description: Why is it off?
date: 2025-11-12
author: Khaizuran Khalid
order: 2
tags: [Layup]
access: [0]
---

The xx% error is deemed quite high and to find out a possible cause for this error, both individual tests and material properties were simulated. 

</div>
</div>
Tensile and compression simulations provided contrasting results. The tensile simulation provided an acceptable error of xx% while the compression simulation provided an error of xx%. To confirm the validity of the simulation boundary conditions, a literature review was conducted to verify different conditions. This was deemed ineffective as the error remained relatively unchanged. This shifted the focus to the material properties. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/base_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 43: Tensile Simulation.</p>
</div>
</div>

<div>
![=x400](/side_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 44: Compression Simulation.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 45: Compression Simulation.</p>
</div>
</div>

<div>
![=x400](/3_piece_solid.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 46: Comparison of boundary conditions.</p>
</div>
</div>
</div>
Since the simulation results were stiffer than the experimental, the individual properties were divided b a factor of 10. The results are provided in figure 47. The sensitivity analysis showed that the simulation is most affected by shear modulus YZ and XZ. Even at a reducted by a factor of 10, the error is exceeding 20% and it would be an unrealistic value for this material property as it is far below typical carbon fibre strength even for a wet layup.

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 47: Comparison of material property simulations.</p>
</div>
</div>
</div>