import React, { useState } from "react";
import moment from "moment";

const TripPlannerPage = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    time: "",
    activity: "",
    description: "",
  });
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Popular destinations (in English to match the design)
  const popularDestinations = [
    "Bangkok",
    "Chiang mai",
    "Phuket",
    "Pattaya",
    "Samui",
  ];

  // Activities options (in English to match the design)
  const activities = [
    { id: "nature", label: "Nature" },
    { id: "city", label: "City" },
    { id: "museum", label: "Museum" },
    { id: "shopping", label: "Shopping" },
    { id: "food", label: "Food" },
  ];

  // Mock trip plans data with times and descriptions
  const mockPlans = {
    Bangkok: {
      nature: [
        {
          time: "09:30 AM",
          activity: "Lumpini Park",
          description: "Beautiful park in the heart of city",
        },
        {
          time: "12:00 PM",
          activity: "Chao Phraya River",
          description: "Scenic boat ride along the river",
        },
        {
          time: "03:00 PM",
          activity: "Bang Krachao",
          description: "Green lung of Bangkok",
        },
      ],
      city: [
        {
          time: "09:00 AM",
          activity: "Grand Palace",
          description: "Historical royal palace complex",
        },
        {
          time: "01:00 PM",
          activity: "ICONSIAM",
          description: "Premium shopping destination",
        },
        {
          time: "06:00 PM",
          activity: "Khao San Road",
          description: "Vibrant backpacker street",
        },
      ],
      museum: [
        {
          time: "10:00 AM",
          activity: "National Museum",
          description: "Thai history and culture",
        },
        {
          time: "02:00 PM",
          activity: "Jim Thompson House",
          description: "Traditional Thai architecture",
        },
        {
          time: "04:00 PM",
          activity: "Bangkok Art Gallery",
          description: "Contemporary art exhibitions",
        },
      ],
      shopping: [
        {
          time: "10:00 AM",
          activity: "Chatuchak Market",
          description: "Weekend market with everything",
        },
        {
          time: "02:00 PM",
          activity: "Siam Paragon",
          description: "Luxury shopping center",
        },
        {
          time: "06:00 PM",
          activity: "Asiatique",
          description: "Riverside shopping and dining",
        },
      ],
      food: [
        {
          time: "08:00 AM",
          activity: "Street Food Tour",
          description: "Authentic local breakfast",
        },
        {
          time: "12:00 PM",
          activity: "Chinatown",
          description: "Traditional Chinese-Thai cuisine",
        },
        {
          time: "07:00 PM",
          activity: "Riverside Dinner",
          description: "Fine dining with river view",
        },
      ],
    },
    "Chiang mai": {
      nature: [
        {
          time: "09:30 AM",
          activity: "Doi suthep",
          description: "Beautiful temple with nature",
        },
        {
          time: "01:00 PM",
          activity: "Elephant Sanctuary",
          description: "Ethical elephant experience",
        },
        {
          time: "04:00 PM",
          activity: "Mae Sa Waterfall",
          description: "Multi-tiered natural waterfall",
        },
      ],
      city: [
        {
          time: "09:00 AM",
          activity: "Old City Temples",
          description: "Historic temple complex",
        },
        {
          time: "02:00 PM",
          activity: "Nimman District",
          description: "Trendy area with cafes and shops",
        },
        {
          time: "06:00 PM",
          activity: "Sunday Walking Street",
          description: "Local market and street food",
        },
      ],
      museum: [
        {
          time: "10:00 AM",
          activity: "Chiang Mai Museum",
          description: "Local history and culture",
        },
        {
          time: "02:00 PM",
          activity: "Lanna Architecture Center",
          description: "Traditional northern Thai design",
        },
        {
          time: "04:00 PM",
          activity: "Art in Paradise",
          description: "Interactive 3D art museum",
        },
      ],
      shopping: [
        {
          time: "12:00 AM",
          activity: "Maya mall",
          description: "Shopping in the central of city",
        },
        {
          time: "03:00 PM",
          activity: "Saturday Night Bazaar",
          description: "Local handicrafts and souvenirs",
        },
        {
          time: "06:00 PM",
          activity: "Central Festival",
          description: "Modern shopping complex",
        },
      ],
      food: [
        {
          time: "08:00 AM",
          activity: "Khao Soi Breakfast",
          description: "Famous northern curry noodles",
        },
        {
          time: "12:00 PM",
          activity: "Local Food Market",
          description: "Traditional Lanna cuisine",
        },
        {
          time: "07:00 PM",
          activity: "Riverside Restaurant",
          description: "Dinner by the Ping River",
        },
      ],
    },
  };

  const handleActivityToggle = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const generateTripPlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const destinationPlans = mockPlans[destination] || mockPlans["Bangkok"];
      const selectedPlans =
        selectedActivities.length > 0
          ? selectedActivities.flatMap(
              (activity) => destinationPlans[activity] || []
            )
          : Object.values(destinationPlans).flat();

      setGeneratedPlan({
        destination,
        startDate,
        endDate,
        activities: selectedActivities,
        planItems: sortByTime(selectedPlans.slice(0, 6)), // Limit to 6 items and sort by time
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleStart = () => {
    setShowForm(true);
  };

  const convertTo12Hour = (hour, minute) => {
    if (!hour || minute === "") return "";
    const hour24 = parseInt(hour);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:${minute.padStart(
      2,
      "0"
    )} ${ampm}`;
  };

  const sortByTime = (planItems) => {
    return planItems.sort((a, b) => {
      try {
        // Convert time string to comparable format
        const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
        const timeB = new Date(`1970/01/01 ${b.time}`).getTime();

        // If parsing fails, fallback to string comparison
        if (isNaN(timeA) || isNaN(timeB)) {
          return a.time.localeCompare(b.time);
        }

        return timeA - timeB;
      } catch (error) {
        // Fallback to string comparison if date parsing fails
        return a.time.localeCompare(b.time);
      }
    });
  };

  const handleAddActivity = () => {
    const formattedTime = convertTo12Hour(selectedHour, selectedMinute);
    if (formattedTime && newActivity.activity && newActivity.description) {
      const activityWithTime = {
        ...newActivity,
        time: formattedTime,
      };
      setGeneratedPlan((prev) => ({
        ...prev,
        planItems: sortByTime([...prev.planItems, activityWithTime]),
      }));
      setNewActivity({ time: "", activity: "", description: "" });
      setSelectedHour("");
      setSelectedMinute("");
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewActivity({ time: "", activity: "", description: "" });
    setSelectedHour("");
    setSelectedMinute("");
    setEditingIndex(null);
  };

  const handleEditActivity = (index) => {
    const activity = generatedPlan.planItems[index];
    setNewActivity({
      time: activity.time,
      activity: activity.activity,
      description: activity.description,
    });
    // Parse 12-hour time to separate hour and minute
    const time12Hour = activity.time;
    const [time, modifier] = time12Hour.split(" ");
    let [hours, minutes] = time.split(":");

    // Convert to 24-hour format for hour selection
    let hour24 = parseInt(hours);
    if (modifier === "PM" && hour24 !== 12) hour24 += 12;
    if (modifier === "AM" && hour24 === 12) hour24 = 0;

    setSelectedHour(hour24.toString());
    setSelectedMinute(minutes);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleUpdateActivity = () => {
    const formattedTime = convertTo12Hour(selectedHour, selectedMinute);
    if (
      formattedTime &&
      newActivity.activity &&
      newActivity.description &&
      editingIndex !== null
    ) {
      const updatedActivity = {
        ...newActivity,
        time: formattedTime,
      };
      setGeneratedPlan((prev) => {
        const updatedItems = [...prev.planItems];
        updatedItems[editingIndex] = updatedActivity;
        return {
          ...prev,
          planItems: sortByTime(updatedItems),
        };
      });
      handleModalClose();
    }
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      setGeneratedPlan((prev) => ({
        ...prev,
        planItems: prev.planItems.filter((_, index) => index !== deleteIndex),
      }));
    }
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  if (!showForm) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
        style={{ fontFamily: "Gilroy, sans-serif" }}
      >
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text and button */}
            <div>
              <h1
                className="text-6xl text-black mb-4"
                style={{ fontWeight: 800 }}
              >
                Plan your Trip
              </h1>
              <p
                className="text-lg text-gray-600 mb-8"
                style={{ fontWeight: 300 }}
              >
                Say goodbye to stress. Our friendly trip planner helps you craft
                the perfect itinerary, manage bookings, and discover hidden
                gems, all in one place.
              </p>
              <button
                onClick={handleStart}
                className="bg-white border-4 w-full border-black  text-black px-12 py-4 rounded-full text-lg"
                style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
              >
                Start
              </button>
            </div>

            {/* Right side - Illustration placeholder */}
            <div className="flex justify-center">
              <div className="w-120 h-120 rounded-full flex items-center justify-center">
                <img
                  src="/travel.png"
                  alt="Trip Planner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-8 px-4"
      style={{ fontFamily: "Gilroy, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Planning Form */}
        <div className="bg-white rounded-lg border-2 border-black p-8 mb-8">
          {/* Destination Selection */}
          <div className="mb-8">
            <label
              className="block text-lg text-black mb-4"
              style={{ fontWeight: 800 }}
            >
              Destination
            </label>
            <div className="flex flex-wrap gap-3">
              {popularDestinations.map((place) => (
                <button
                  key={place}
                  onClick={() => setDestination(place)}
                  className={`px-6 py-3 rounded-full border-2 transition-colors ${
                    destination === place
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
                  style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-lg text-black mb-4"
                  style={{ fontWeight: 800 }}
                >
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-4 border-2 border-black rounded-lg focus:outline-none text-lg"
                />
              </div>
              <div>
                <label
                  className="block text-lg text-black mb-4"
                  style={{ fontWeight: 800 }}
                >
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-4 border-2 border-black rounded-lg focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>

          {/* Activity Selection */}
          <div className="mb-8">
            <label
              className="block text-lg text-black mb-4"
              style={{ fontWeight: 800 }}
            >
              Choose the activity you are interested in
            </label>
            <div className="flex flex-wrap gap-3">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityToggle(activity.id)}
                  className={`px-6 py-3 rounded-full border-2 transition-colors ${
                    selectedActivities.includes(activity.id)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
                  style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
                >
                  {activity.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mt-8">
            <button
              onClick={generateTripPlan}
              disabled={!destination || !startDate || !endDate || isGenerating}
              className="px-8 py-4 bg-white text-black text-lg rounded-lg border-4 border-black disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
            >
              {isGenerating ? "Generating plan..." : "Generate Trip Plan"}
            </button>
          </div>
        </div>

        {/* Generated Plan */}
        {generatedPlan && (
          <div className="bg-white rounded-lg border-2 border-black p-8">
            <h2
              className="text-2xl text-black mb-6"
              style={{ fontWeight: 800 }}
            >
              Travel plan: {generatedPlan.destination}
            </h2>

            <div className="space-y-4">
              {generatedPlan.planItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg group"
                >
                  <div className="flex-shrink-0">
                    <span className="text-black" style={{ fontWeight: 800 }}>
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-black" style={{ fontWeight: 800 }}>
                      {item.activity}
                    </h3>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ fontWeight: 300 }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditActivity(index)}
                      className="px-3 py-1 bg-white text-black rounded border-2 border-black hover:bg-gray-50 transition-colors"
                      style={{ fontWeight: 300, fontSize: "12px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded border-2 border-red-500 hover:bg-red-600 transition-colors"
                      style={{ fontWeight: 300, fontSize: "12px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {generatedPlan.planItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No travel plan found for selected destination and activities
                </p>
                <p className="text-sm mt-2">
                  Try selecting different activities or destination
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-white text-black rounded-lg border-4 border-black hover:bg-gray-50 transition-colors"
                  style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
                >
                  Add Activity
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  Plan Another Trip
                </button>
                <button
                  onClick={() => {
                    const planText = `Travel Plan: ${
                      generatedPlan.destination
                    }\n\n${generatedPlan.planItems
                      .map(
                        (item) =>
                          `${item.time} - ${item.activity}\n${item.description}`
                      )
                      .join("\n\n")}`;
                    navigator.clipboard.writeText(planText);
                    alert("Plan copied to clipboard!");
                  }}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  Copy Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Activity Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-lg border-4 border-black p-8 max-w-md w-full"
              style={{
                fontFamily: "Gilroy, sans-serif",
                boxShadow: "0 8px 0 #2a2a2a",
              }}
            >
              <h3
                className="text-2xl text-black mb-6"
                style={{ fontWeight: 800 }}
              >
                {editingIndex !== null
                  ? "Edit Activity"
                  : "Add Custom Activity"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-lg text-black mb-2"
                    style={{ fontWeight: 800 }}
                  >
                    Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <select
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(e.target.value)}
                        className="w-full p-3 border-2 border-black rounded-lg focus:outline-none"
                        style={{ fontWeight: 300 }}
                      >
                        <option value="">Hour</option>
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i}>
                            {i === 0
                              ? "12 AM"
                              : i < 12
                              ? `${i} AM`
                              : i === 12
                              ? "12 PM"
                              : `${i - 12} PM`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={selectedMinute}
                        onChange={(e) => setSelectedMinute(e.target.value)}
                        className="w-full p-3 border-2 border-black rounded-lg focus:outline-none"
                        style={{ fontWeight: 300 }}
                      >
                        <option value="">Minute</option>
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-lg text-black mb-2"
                    style={{ fontWeight: 800 }}
                  >
                    Activity
                  </label>
                  <input
                    type="text"
                    value={newActivity.activity}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity: e.target.value,
                      })
                    }
                    placeholder="e.g., Visit Local Market"
                    className="w-full p-3 border-2 border-black rounded-lg focus:outline-none"
                    style={{ fontWeight: 300 }}
                  />
                </div>

                <div>
                  <label
                    className="block text-lg text-black mb-2"
                    style={{ fontWeight: 800 }}
                  >
                    Description
                  </label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        description: e.target.value,
                      })
                    }
                    placeholder="e.g., Explore traditional crafts and local food"
                    rows="3"
                    className="w-full p-3 border-2 border-black rounded-lg focus:outline-none resize-none"
                    style={{ fontWeight: 300 }}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors flex-1"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </button>
                <button
                  onClick={
                    editingIndex !== null
                      ? handleUpdateActivity
                      : handleAddActivity
                  }
                  disabled={
                    !selectedHour ||
                    selectedMinute === "" ||
                    !newActivity.activity ||
                    !newActivity.description
                  }
                  className="px-6 py-3 bg-white text-black rounded-lg border-4 border-black hover:bg-gray-50 transition-colors flex-1 disabled:bg-gray-200 disabled:border-gray-400 disabled:cursor-not-allowed"
                  style={{ fontWeight: 300, boxShadow: "0 4px 0 #2a2a2a" }}
                >
                  {editingIndex !== null ? "Update Activity" : "Add Activity"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-lg border-4 border-black p-8 max-w-sm w-full"
              style={{
                fontFamily: "Gilroy, sans-serif",
                boxShadow: "0 8px 0 #2a2a2a",
              }}
            >
              <h3
                className="text-2xl text-black mb-4"
                style={{ fontWeight: 800 }}
              >
                Delete Activity
              </h3>

              <p className="text-gray-600 mb-6" style={{ fontWeight: 300 }}>
                Are you sure you want to delete this activity? This action
                cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-6 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors flex-1"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex-1"
                  style={{ fontWeight: 300 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlannerPage;
