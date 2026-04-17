---
title: 5. Manufacturing
description: 
date: 2026-4-4
author: Khaizuran Khalid
order: 5
tags: [Manufacturing]
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

## **Specimen Panel**
Instead of the initial plan of testing 7 different plies, only 7, 11 and 14 plies were tested in the interest of time. Additionally, these 3 layups would provide an adequate range for testing purposes. The 7 and 11 ply panels were laid in a single cure. This is as recommended by Mr Kenneth that layups exceeding 10 layers would require 2 cures. As such, the 14 ply panel was cured as 2 separate 7 ply panels. The panels was then cured for 48 hours before demoulding and left to fully cure for another 5 days since the 2175 epoxy requires 7 days for a full cure. Finally, the panels was then sent for waterjet processing to cut out the required specimens. Waterjet was chosen for the post processing method to minimise its heat affected zone since the epoxy in VARTM carbon fiber is more sensitive to heat. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Laying_of_Panel.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 40: Laying of panel.</p>
</div>
</div>

<div>
![=x400](/DXF_File_Of_CF_Specimen.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 41: DXF File of Specimens.</p>
</div>
</div>
</div>

<div>
![=x400](/7ply_Specimen_Dimensions.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 42: 7ply Specimen Dimensions.</p>
</div>
</div>

<div>
![=x400](/11ply_Specimen_Dimensions.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 43: 11ply Specimen Dimensions.</p>
</div>
</div>

<div>
![=x400](/14ply_Specimen_Dimensions.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 44: 14ply Specimen Dimensions.</p>
</div>
</div>