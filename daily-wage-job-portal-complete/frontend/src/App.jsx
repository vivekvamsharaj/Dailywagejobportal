import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import PhoneAuth from './components/PhoneAuth';

function App() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
          setLocation(coords);
          fetchNearbyJobs(coords.lat, coords.lng);
        },
        (err) => {
          alert("Geolocation error: " + err.message);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const fetchNearbyJobs = async (lat, lng) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/nearby?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reliable map redirect using full location navigation
  const openNavigation = (ownerLat, ownerLng) => {
    if (!location) {
      alert("Please click 'Find Jobs (10km)' first to get your current location.");
      return;
    }
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${ownerLat},${ownerLng}&travelmode=driving`;
    window.location.href = mapsUrl;
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Language Switches */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => i18n.changeLanguage('te')} className="px-3 py-1 bg-blue-600 text-white rounded">తెలుగు</button>
        <button onClick={() => i18n.changeLanguage('hi')} className="px-3 py-1 bg-orange-600 text-white rounded">हिंदी</button>
        <button onClick={() => i18n.changeLanguage('en')} className="px-3 py-1 bg-gray-600 text-white rounded">English</button>
      </div>

      <h1 className="text-xl font-bold text-center mb-6">{t('welcome')}</h1>

      {!user ? (
        <PhoneAuth onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />
      ) : (
        <div>
          <button 
            onClick={getUserLocation} 
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow mb-6"
          >
            {loading ? "Locating..." : t('find_work')}
          </button>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600">Wage: <span className="font-bold text-green-700">₹{job.dailyWage}/day</span></p>
                <p className="text-sm text-gray-500">Owner: {job.ownerName}</p>
                <p className="text-sm text-gray-500">{job.address}</p>

                <div className="mt-4 flex gap-2">
                  <a href={`tel:${job.ownerPhone}`} className="flex-1 text-center py-2 bg-blue-500 text-white rounded font-medium">
                    📞 {t('call_owner')}
                  </a>
                  <button 
                    onClick={() => openNavigation(job.location.coordinates[1], job.location.coordinates[0])}
                    className="flex-1 py-2 bg-amber-500 text-white rounded font-medium"
                  >
                    🗺️ {t('get_directions')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
