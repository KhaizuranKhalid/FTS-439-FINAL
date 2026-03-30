---
title: 4.4. Results
description: 
date: 2025-11-12
author: Khaizuran Khalid
order: 4
tags: [FEA, Results, Deformation, Stress]
access: [0]
---

## **Loading Condition**

The images below show the load calculations for R25e and R26e. The load case for R25e is used as it is
the more intensive of the two. Also, only compression force is applied as it is the only one that can be
tested in an experiment. This allows for future comparison between simulation and experiment.


<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/R25e_load_case.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Table 6: R25e Load Calcs.</p>
</div>
</div>

<div>
![=x400](/R26_load_calc.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Table 7: R26e Load Calcs.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/CF_deformation.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 34: CF Deformation.</p>
</div>
</div>

<div>
![=x400](/CF_stress.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 35: CF Stress.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![](/FEA_results.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Table 8: FEA Results.</p>
</div>
</div>
</div>

| Weight (g) | Keizer 10" CL | CFRP   | Diff   |
|------------|---------------|--------|--------|
| Outer      | 687.5         | 584.4  | -103.1 |
| Inner      | 986.5         | 850.5  | -136.0 |
| Centre     | 520.4         | 520.4  | 0      |
| Hardware   | 180           | 180    | 0      |
| Total      | 2374.4        | 2135.3 | -239.1 |

<div className="w-full flex items-center justify-center">
<p className="italic">Table 9: Weight Savings.</p>
</div>

By purely converting the material from aluminium to Carbon Fiber, there is a mass reduction of 10%, meeting our goal. 
However, since Carbon Fiber is stronger, it could be further optimised to reduce even more weight. This will be
covered in future works.