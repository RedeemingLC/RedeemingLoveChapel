"use strict";

const Wisdom = require("../models/WordOfWisdom");

/* =========================
   Rotate Daily Wisdom
========================= */
const rotateWisdom = async () => {
  try {
    const allWisdom = await Wisdom.find();

    if (!allWisdom.length) return;

    // Find current active wisdom
    const current = await Wisdom.findOne({ isActive: true });

    // Deactivate current wisdom
    if (current) {
      current.isActive = false;
      await current.save();
    }

    // Pick a random new one
    const random = allWisdom[Math.floor(Math.random() * allWisdom.length)];

    random.isActive = true;
    random.lastActivatedAt = new Date();

    await random.save();

    console.log("✅ Wisdom rotated successfully");
  } catch (err) {
    console.error("❌ ROTATION ERROR:", err);
  }
};

module.exports = { rotateWisdom };
