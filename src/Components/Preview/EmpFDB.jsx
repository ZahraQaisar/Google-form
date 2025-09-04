import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const EmployeeFeedback = ({ onClose }) => {
    const [workLifeBalance, setWorkLifeBalance] = useState(50);
    const [managerSupport, setManagerSupport] = useState(50);
    const [comments, setComments] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = { workLifeBalance, managerSupport, comments };
        console.log("Submitted Feedback:", feedback);
        alert("Thanks for your response!");
        onClose();
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-[800px] max-h-[90vh] rounded-xl shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Form Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Employee Feedback
                    </h2>
                    <p className="text-base text-gray-500 mb-6">
                        Your responses are anonymous.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Work-life balance */}
                        <div className="border rounded-lg p-4">
                            <label className="block font-medium text-gray-700 mb-2">
                                Work-life balance
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={workLifeBalance}
                                onChange={(e) => setWorkLifeBalance(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Poor</span>
                                <span>Excellent</span>
                            </div>
                        </div>

                        {/* Manager support */}
                        <div className="border rounded-lg p-4">
                            <label className="block font-medium text-gray-700 mb-2">
                                Manager support
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={managerSupport}
                                onChange={(e) => setManagerSupport(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Low</span>
                                <span>High</span>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="border rounded-lg p-4">
                            <label className="block font-medium text-gray-700 mb-2">
                                Anything else to share?
                            </label>
                            <textarea
                                rows="3"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Write your feedback..."
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t px-6 py-4 rounded-b-xl bg-gray-50">
                    <span className="text-sm text-gray-500">Page 1 of 1</span>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-800 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFeedback;
