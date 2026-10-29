const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /api/jobs/nearby?lat=17.3850&lng=78.4867
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Worker's current location (lat & lng) is required." });
    }

    const workerLat = parseFloat(lat);
    const workerLng = parseFloat(lng);

    // MongoDB $near query (10km = 10,000 meters)
    const nearbyJobs = await Job.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [workerLng, workerLat]
          },
          $maxDistance: 10000 // 10 km radius
        }
      }
    });

    res.status(200).json({ success: true, count: nearbyJobs.length, jobs: nearbyJobs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/jobs/create (Owner creates a job posting)
router.post('/create', async (req, res) => {
  try {
    const { title, category, dailyWage, ownerName, ownerPhone, lat, lng, address } = req.body;

    const newJob = await Job.create({
      title,
      category,
      dailyWage,
      ownerName,
      ownerPhone,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      address
    });

    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
