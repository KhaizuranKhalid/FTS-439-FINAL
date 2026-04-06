---
title: 7. Constraints
description: What went wrong
date: 2025-11-12
author: Khaizuran Khalid
order: 7
tags: [Constraints, error]
access: [0]
---

Several limitations were identified throughout the course of this project:

1. Compression test of rims.

According to industry practices such as the SAE standards, compression testing is typically performed with tires mounted. This provides a more realistic load distribution and accounts for geometric irregularities. Testing with tires showed an applicator displacement of 14.832mm and 13.986mm for aluminium rims and prepreg carbon rims respectively. This contrasts with the results obtained without tires, indicating that the loading condition initially set with direct contact is unrealistic.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: SAE Standard Testing.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: Compression with Tire.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: Tire Compression Data.</p>
</div>
</div>
</div>

2. Compression jig for rims.

As mentioned above, there may be geometric inconsistencies with the rims. Although CNC machining is chosen as the most accurate method to post process the rims, the inner and outer barrels are not exactly concentric to one another. The figure below shows the applicator only having 1 point of contact despite a preload of 200N. To have equal contact of the applicator on both the barrels, it was found that an additional displacement of around 0.5mm. This causes a large preload on one of the barrel and thus cause additional stress on the rim before the actual experiment.

Due to manufacturing tolerances, the rims were not perfectly concentric. As a result, the compression applicator initially contacted the rim at a single point as shown in figure xx. To achieve full contact, an additional displacement of approximately 0.5mmm was required, resulting in a preload of approximately 200N. This affects the accuracy of the measured displacement since one side of the rim is unequally loaded.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: Gap on carbon fiber rim.</p>
</div>
</div>
</div>

3. Apparatus calibration.

The testing machines are over 15 years old and undergo annual calibration, typically in April. As testing was conducted between January and March, calibration drift may have contributed to inaccuracies as seen on the Instron 8501. Furthermore, the observed oscillatory behaviour of the Instron 8501 suggests limitations in displcement control, reinforcing the likelyhood of measurement error.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: Calibration Quote.</p>
</div>
</div>
</div>

4. Dial gauge.

The available horizontal dial gauges had a limited range of 0.8mm while the expected displacements exceeded 6mm. This restricted accurate midspan measurement and required multiple setups, potentiall affecting consistency due to poor displacement control.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/edge_3_piece.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 49: Horizontal Dial Gauge Range.</p>
</div>
</div>
</div>