import React, { useState } from 'react';
import moment from 'moment';

const TripPlannerPage = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Popular destinations
  const popularDestinations = [
    'กรุงเทพมหานคร',
    'เชียงใหม่',
    'ภูเก็ต',
    'พัทยา',
    'หัวหิน',
    'เกาะช้าง',
    'เกาะสมุย',
    'กระบี่'
  ];

  // Activities options
  const activities = [
    { id: 'nature', label: 'ธรรมชาติ', emoji: '🏞', color: 'bg-green-100 text-green-800' },
    { id: 'city', label: 'เมือง', emoji: '🏙', color: 'bg-blue-100 text-blue-800' },
    { id: 'museum', label: 'พิพิธภัณฑ์', emoji: '🎨', color: 'bg-purple-100 text-purple-800' },
    { id: 'shopping', label: 'ช้อปปิ้ง', emoji: '🛍', color: 'bg-pink-100 text-pink-800' },
    { id: 'food', label: 'อาหาร', emoji: '🍜', color: 'bg-orange-100 text-orange-800' }
  ];

  // Mock trip plans data
  const mockPlans = {
    'กรุงเทพมหานคร': {
      nature: [
        { day: 1, activities: ['เดินชมสวนลุมพินี', 'ล่องเรือเจ้าพระยา', 'ชมพระอาทิตย์ตกที่อโศกา'] },
        { day: 2, activities: ['เที่ยวเกาะเกร็ด', 'เดินตลาดน้ำ', 'นั่งเรือหางยาว'] }
      ],
      city: [
        { day: 1, activities: ['เที่ยววัดพระแก้ว', 'ชมพระบรมมหาราชวัง', 'เดินย่านถนนข้าวสาร'] },
        { day: 2, activities: ['เที่ยว ICONSIAM', 'ขึ้นตึก Mahanakhon SkyWalk', 'เดินตลาดรถไฟรัชดา'] }
      ],
      museum: [
        { day: 1, activities: ['พิพิธภัณฑ์สยาม', 'พิพิธภัณฑ์เรือพระราชพิธี', 'หอศิลป์กรุงเทพ'] },
        { day: 2, activities: ['พิพิธภัณฑ์ธนาคารแห่งประเทศไทย', 'บ้านจิม ทอมป์สัน', 'หอศิลป์แห่งกรุงเทพมหานคร'] }
      ],
      shopping: [
        { day: 1, activities: ['ช้อปปิ้งที่ Siam Paragon', 'เดินตลาดจตุจักร', 'ชม Terminal 21'] },
        { day: 2, activities: ['เที่ยว CentralWorld', 'ตลาดน้ำอัมพวา', 'Asiatique The Riverfront'] }
      ],
      food: [
        { day: 1, activities: ['กินข้าวที่เจ๊ไฝ ส้มตำ', 'ลิ้มลองขนมไทยที่ตลาดวาโร', 'ดื่มชาไทยที่ Chatuchak'] },
        { day: 2, activities: ['อาหารเช้าที่ตลาดนัดรถไฟ', 'อาหารกลางวันที่ย่านเยาวราช', 'ดินเนอร์ริมแม่น้ำเจ้าพระยา'] }
      ]
    },
    'เชียงใหม่': {
      nature: [
        { day: 1, activities: ['เที่ยวดอยสุเทพ', 'เดินป่าที่ดอยอินทนนท์', 'ชมพระอาทิตย์ตกที่ดอยคำ'] },
        { day: 2, activities: ['เยี่ยมชมสวนสัตว์เชียงใหม่', 'ล่องแก่งแม่ปิง', 'เที่ยวตลาดต้นเปยะ'] }
      ],
      city: [
        { day: 1, activities: ['เดินย่านนิมมานเหมินท์', 'ชมวัดพระสิงห์', 'เดินตลาดเมืองเก่า'] },
        { day: 2, activities: ['เที่ยว Maya Lifestyle Shopping Center', 'ชมประตูท่าแพ', 'เดินสะพานนวรัตน์'] }
      ],
      museum: [
        { day: 1, activities: ['พิพิธภัณฑ์เชียงใหม่', 'บ้านล้านนา', 'ศูนย์ศิลปะและวัฒนธรรมเชียงใหม่'] },
        { day: 2, activities: ['พิพิธภัณฑ์ล้านนา', 'บ้านไม้แสนดอกไม้แสนงาม', 'ศูนย์ส่งเสริมศิลปกรรม'] }
      ],
      shopping: [
        { day: 1, activities: ['ช้อปปิ้งที่ตลาดสวนดอก', 'เดินตลาดวโรรส', 'ซื้อของฝากย่านท่าแพ'] },
        { day: 2, activities: ['ตลาดเสาร์-อาทิตย์ที่ถนนคนเดิน', 'Central Festival Chiang Mai', 'ร้านขายของที่ระลึกบนดอยสุเทพ'] }
      ],
      food: [
        { day: 1, activities: ['ลิ้มลองข้าวซอยเชียงใหม่', 'กินแกงฮังเล', 'ลองขนมจีนน้ำเงี้ยว'] },
        { day: 2, activities: ['อาหารเช้าที่ตลาดธนิน', 'กินข้าวแกงเหนือ', 'ดินเนอร์ที่ riverside restaurant'] }
      ]
    }
  };

  const handleActivityToggle = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const generateTripPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const destinationPlans = mockPlans[destination] || mockPlans['กรุงเทพมหานคร'];
      const selectedPlans = selectedActivities.length > 0 
        ? selectedActivities.flatMap(activity => destinationPlans[activity] || [])
        : Object.values(destinationPlans).flat();

      // Combine and organize by day
      const dayPlans = {};
      selectedPlans.forEach(plan => {
        if (!dayPlans[plan.day]) {
          dayPlans[plan.day] = [];
        }
        dayPlans[plan.day].push(...plan.activities);
      });

      // Remove duplicates and limit activities per day
      Object.keys(dayPlans).forEach(day => {
        dayPlans[day] = [...new Set(dayPlans[day])].slice(0, 3);
      });

      setGeneratedPlan({
        destination,
        startDate,
        endDate,
        activities: selectedActivities,
        dailyPlans: dayPlans
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyPlanLink = () => {
    const planData = encodeURIComponent(JSON.stringify({
      destination,
      startDate,
      endDate,
      activities: selectedActivities
    }));
    const link = `${window.location.origin}${window.location.pathname}?plan=${planData}`;
    navigator.clipboard.writeText(link);
    alert('คัดลอกลิงก์แผนการเที่ยวแล้ว!');
  };

  const downloadPDF = () => {
    // Simple implementation - in real app would use PDF library
    const content = `
แผนการเที่ยว ${destination}
วันที่: ${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}

${Object.entries(generatedPlan?.dailyPlans || {}).map(([day, activities]) => 
  `วันที่ ${day}: ${activities.join(', ')}`
).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `แผนการเที่ยว-${destination}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ✈️ วางแผนเที่ยว
          </h1>
          <p className="text-gray-600 text-lg">สร้างแผนการเที่ยวในไทยแบบง่ายๆ</p>
        </div>

        {/* Planning Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Destination Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              📍 เลือกปลายทาง
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="พิมพ์ชื่อจังหวัด..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg mb-4"
            />
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((place) => (
                <button
                  key={place}
                  onClick={() => setDestination(place)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              📅 เลือกวันที่เดินทาง
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">วันที่ไป</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">วันที่กลับ</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Activity Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              🎯 เลือกกิจกรรมที่สนใจ
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <label
                  key={activity.id}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedActivities.includes(activity.id)
                      ? `${activity.color} border-current`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedActivities.includes(activity.id)}
                    onChange={() => handleActivityToggle(activity.id)}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{activity.emoji}</span>
                  <span className="font-medium">{activity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateTripPlan}
              disabled={!destination || !startDate || !endDate || isGenerating}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? '🔄 กำลังสร้างแผน...' : '✨ สร้างแผนการเที่ยว'}
            </button>
          </div>
        </div>

        {/* Generated Plan */}
        {generatedPlan && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                📋 แผนการเที่ยว {generatedPlan.destination}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={copyPlanLink}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  🔗 คัดลอกลิงก์
                </button>
                <button
                  onClick={downloadPDF}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  📄 บันทึกไฟล์
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-700">
                <strong>วันที่:</strong> {moment(generatedPlan.startDate).format('DD/MM/YYYY')} - {moment(generatedPlan.endDate).format('DD/MM/YYYY')}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>ระยะเวลา:</strong> {moment(generatedPlan.endDate).diff(moment(generatedPlan.startDate), 'days') + 1} วัน
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(generatedPlan.dailyPlans).map(([day, dayActivities]) => (
                <div key={day} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    วันที่ {day}
                  </h3>
                  <ul className="space-y-2">
                    {dayActivities.map((activity, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {Object.keys(generatedPlan.dailyPlans).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>ไม่พบข้อมูลแผนการเที่ยวสำหรับปลายทางและกิจกรรมที่เลือก</p>
                <p className="text-sm mt-2">ลองเลือกกิจกรรมอื่นหรือปลายทางอื่น</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlannerPage; 