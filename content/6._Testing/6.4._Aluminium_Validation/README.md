---
title: 6.4. Aluminium Validation 
description: Is ACP the problem?
date: 2026-4-4
author: Khaizuran Khalid
order: 4
tags: [Aluminium]
access: [0]
---
To isolate material-related and software uncertainties, 6061 aluminium specimens were tested under identical conditions. Aluminium was selected for its well-characterised isotropic properties, eliminating the complexity associated with composite modelling. Testing was done on the usual Instron 8874.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Aluminium_Specimen.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 55: Aluminium specimen.</p>
</div>
</div>
</div>

Despite this simplification, the discrepancy between experimental and simulation results remained at approximately 65%, consistent with the composite simulations.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Comparison_Alu_Sim_And_Experiment.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 56: Comparison between simulation and experimental values.</p>
</div>
</div>
</div>

To further verify the simulation model, theorethical deflection was calculated using classical beam theory. The result closely matched the simulation results, confirming that the simulation model is fundamentally accurate. This strongly indicates that the observed discrepancies originate from the experimental setup rather than the simulation or material models. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Calculated_Alu_Deflection_Comparison.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 57: Calculated Deflection Values.</p>
</div>
</div>
</div>