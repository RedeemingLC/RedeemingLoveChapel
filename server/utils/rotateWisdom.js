"use strict";

const Wisdom = require("../models/WordOfWisdom");

/* =========================
   Rotate Daily Wisdom
========================= */
const rotateWisdom = async () => {
  try {
    const current = await Wisdom.findOne({ isActive: true });

    // Find wisdom that is not currently active
    const availableWisdom = await Wisdom.find(
      current ? { _id: { $ne: current._id } } : {},
    );

    // If there is only one wisdom, keep it active
    if (!availableWisdom.length) {
      if (current) {
        console.log("ℹ️ Only one wisdom available. Keeping current wisdom.");
        return;
      }

      console.log("ℹ️ No wisdom available to rotate.");
      return;
    }

    // Pick a random new wisdom
    const random =
      availableWisdom[Math.floor(Math.random() * availableWisdom.length)];

    // Activate the new wisdom first
    random.isActive = true;
    random.lastActivatedAt = new Date();
    await random.save();

    // Deactivate the previous wisdom
    if (current) {
      current.isActive = false;
      await current.save();
    }

    console.log("✅ Wisdom rotated successfully");
  } catch (err) {
    console.error("❌ ROTATION ERROR:", err);
  }
};

module.exports = { rotateWisdom };
