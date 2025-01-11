import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type RimSize = '700c/29"' | '650b/27.5"' | '26"';

function App() {
  const [rimSize, setRimSize] = useState<RimSize>('700c/29"');
  const [tireWidth, setTireWidth] = useState<string>('');

  const getRimDiameter = (size: RimSize): number => {
    switch (size) {
      case '700c/29"':
        return 622;
      case '650b/27.5"':
        return 584;
      case '26"':
        return 559;
    }
  };

  const calculateSealantVolume = (): number => {
    if (!tireWidth) return 0;
    
    const rimDiameter = getRimDiameter(rimSize);
    const width = parseFloat(tireWidth);
    
    return 4 * Math.PI * Math.PI * 
      ((rimDiameter/1000/2) + (width/1000/2)) * 
      (width/1000/2) * 300;
  };

  const sealantVolume = calculateSealantVolume();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Tire Sealant Calculator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Rim Size
            </label>
            <div className="space-y-2">
              {['700c/29"', '650b/27.5"', '26"'].map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="radio"
                    id={size}
                    name="rim-size"
                    value={size}
                    checked={rimSize === size}
                    onChange={(e) => setRimSize(e.target.value as RimSize)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={size} className="ml-3 block text-sm font-medium text-gray-700">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="tire-width" className="block text-sm font-medium text-gray-700 mb-2">
              Measured Tire Width (mm)
            </label>
            <input
              type="number"
              id="tire-width"
              value={tireWidth}
              onChange={(e) => setTireWidth(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter tire width"
            />
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Baseline Sealant Volume
            </h2>
            <p className="text-2xl font-bold text-indigo-600">
              {sealantVolume.toFixed(1)} mL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;