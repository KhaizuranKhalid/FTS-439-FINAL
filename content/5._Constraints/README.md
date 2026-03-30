---
title: 5. Constraints
description: 
date: 2025-11-12
author: Khaizuran Khalid
order: 5
tags: [Constraints]
access: [0]
---

With any design project, problems may arise. This section
highlights the challenges and constraints that need to be resolved to have a 
hollistic approach to creating the CF rims. 

## **Space**
Due to the nature of carbon fiber layups, there needs to be overlap between the plies to ensure proper bonding of the fabric. This overlap results in a thickness doubled of the nomical thickness. The closest components to the rim include the tabs of the brake pads and a corner of the upright. In the previous wheel, there was contact between these parts. This could be remedied by staggering the overlaps to spread it out. There is no method as of yet to easily do this in ACP.
<br></br>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/overlap_regions.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 36: Overlap Regions.</p>
</div>
</div>

<div>
![=x400](/CF_contact.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 37: Contact with Brake Pad Tabs.</p>
</div>
</div>
</div>

## **Time**
As experienced in the previous year, the time taken to manufacture the carbon fiber rims was significantly longer than expected. Although the plies were precut by Admiralty International, the layup of the plies still took a significant amount of time due to the sheer number of plies in each layer. The dry fabric is easier to be shaped, allowing for larger plies and cutting down cutting and laying timmes.

| Time (hrs) | Prepreg      | Dry Fabric       |
|------------|--------------|------------------|
| Cutting    | 13*0.5 = 7.5 | 13 * 0.25 = 3.75 |
| Laying     | 13*0.5 = 7.5 | 13 * 0.25 = 3.75 |
| Bagging    | 3*0.33 = 1   | 2*0.33 = 0.66    |
| Total      | 14 Hours     | 8.16 Hours       |

<div className="w-full flex items-center justify-center">
<p className="italic">Table 10: Possible Time Savings.</p>
</div>

## **High Stress Point**
Based on the Ansys FEA, there is high stress at the bolt holes of the rims. This may be due due to stress concentration as this could also be seen 
on the aluminium wheels. Despite this, the carbon fiber wheels that was tested on R24e did display some damage in the same areas, likely due to the
threads of the bolt coming into contact and rubbing on the holes. This could be rectified by implementing inserts that are bonded to replace the bolt holes. This will spread out the bearing load on the hole and more importantly protect the carbon fiber from abrasion with the bolts. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/CF_max_stress.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 38: Bolt Holes Stress.</p>
</div>
</div>

<div>
![=x400](/Hole_damage.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 39: Damage on Bolt Holes.</p>
</div>
</div>
</div>