---
title: 7. Constraints
description: What went wrong
date: 2026-4-4
author: Khaizuran Khalid
order: 7
tags: [Constraints, error]
access: [0]
---

Several limitations were identified throughout the course of this project:

1. Compression test of rims.

According to industry practices such as the SAE standards, impact testing is typically performed with tires mounted. This provides a more realistic load distribution and accounts for geometric irregularities. Testing with tires showed an applicator displacement of 14.832mm and 13.986mm for aluminium rims and prepreg carbon rims respectively, suggesting that the carbon fiber rim is stiffer. This contradicts with the results obtained without tires, indicating that the loading condition initially set with direct contact is unrealistic.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/SAE_J3203_Test.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 66: SAE J3203 Testing.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Compression_With_Tire.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 67: Compression with Tire.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Tire_Compression_Data.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 68: Tire Compression Data.</p>
</div>
</div>
</div>

2. Compression jig for rims.

As mentioned above, there may be geometric inconsistencies with the rims. Although CNC machining is chosen as the most accurate method to post process the rims, the inner and outer barrels are not exactly concentric to one another. The figure below shows the applicator only having 1 point of contact despite a preload of 200N. To have equal contact of the applicator on both the barrels, it was found that an additional displacement of around 0.5mm. This causes a large preload on one of the barrel and thus cause additional stress on the rim before the actual experiment.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Gap_On_Carbon_Fiber_Rim.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 69: Gap on carbon fiber rim.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Uneven_Deflection_Rim.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 70: Tilting of Applicator.</p>
</div>
</div>
</div>

3. Apparatus calibration.

The testing machines are over 15 years old and undergo annual calibration, typically in April. As testing was conducted between January and March, calibration drift may have contributed to inaccuracies as seen on the Instron 8501. Furthermore, the observed oscillatory behaviour of the Instron 8501 suggests limitations in displcement control, reinforcing the likelyhood of measurement error.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Calibration_Quote.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 71: Calibration Quote.</p>
</div>
</div>
</div>

4. Dial gauge.

The available horizontal dial gauges had a limited range of 0.8mm while the expected displacements exceeded 6mm. This restricted accurate midspan measurement and required multiple setups, potentially affecting consistency due to poor displacement control.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Horizontal_Dial_Guage_Range.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 72: Horizontal Dial Gauge Range.</p>
</div>
</div>
</div>

5. Jig Limitations

As previously mentioned in the sensitivity analysis, the dominant property affecting the simulation was the Shear Modulus of elasticity YZ and XZ (Gᵧz, Gₓz). To derive this material data, ASTM D5379 could be used for out-of-plane shear properties of the composite. However, it requires a specific jig that is not available.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/ASTM_D5379_Jig.jpg)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 73: ASTM D5379 Jig.</p>
</div>
</div>
</div>