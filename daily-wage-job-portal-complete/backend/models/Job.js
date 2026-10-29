const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Masonry', 'Painting', 'Plumbing', 'Electrical', 'Helper', 'Carpentry'],
    required: true 
  },
  dailyWage: { type: Number, required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  
  // Geospatial GeoJSON Data Field
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Format: [Longitude, Latitude]
      required: true
    }
  },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 2dsphere index for 10km spatial queries
JobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', JobSchema);
