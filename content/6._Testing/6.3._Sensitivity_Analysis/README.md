---
title: 6.3. Sensitivity Analysis
description: Why is it off?
date: 2025-11-12
author: Khaizuran Khalid
order: 3
tags: [Layup]
access: [0]
---

Given the large discrepancy observed, individual simulations and sensitivity analysis was conducted to identify the dominant material properties affecting the simulation results. The independant simulations yielded an error of 20% and 96% for tensile and compression simulations respectively. A literature review was conducted to verify the boundary condition assumptions but these variations had little impact on the results. This indicated that the disprepancy was more likely due to material property inaccuracies.


<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/base_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 43: Tensile Simulation.</p>
</div>
</div>
</div>

<div>
![=x400](/side_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 44: Compression Simulation.</p>
</div>
</div>

Subsequently, individual material properties were systematically reduced by a factor of 10 to evaluate their influence. This revealed that Shear Modulus YZ and XZ (Gᵧz, Gₓz) had the greatest influence on the 3 point bending deflection. Although the reduction of these values reduced the simulation-experiment gap, the required reduction is unrealistic for carbon fiber composites. This confirms that the discrepancy is not only affected by the material properties alone.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 47: Comparison of material property simulations.</p>
</div>
</div>
</div>