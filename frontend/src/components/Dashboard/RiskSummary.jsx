import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import API from "../../services/api";


const RiskSummary = () => {

    const [risk, setRisk] = useState({
        riskScore: 0,
        riskLevel: "unknown"
    });

    useEffect(() => {

        const fetchRisk = async () => {

            try {

                const userId = localStorage.getItem("userId");

                if (!userId) return;

                const res = await API.get(`/risk/${userId}`);

                setRisk(res.data);

            } catch (error) {

                console.error("Failed to fetch risk summary", error);

            }

        };

        fetchRisk();

    }, []);

    console.log(risk)


    const levelColor = {
        low: "bg-green-100 hover:bg-green-200",
        moderate: "bg-yellow-100 hover:bg-yellow-200",
        high: "bg-red-100 hover:bg-red-200",
        unknown: "bg-gray-100 hover:bg-gray-200"
    };

    const iconColor = {
        low: "bg-green-500",
        moderate: "bg-yellow-500",
        high: "bg-red-500",
        unknown: "bg-gray-500"
    };

    const message = `Risk Level: ${risk.riskLevel}  Score: ${risk.riskScore}`;

    return (
        <div
            className={`flex-1 flex items-center justify-between transition p-4 rounded-xl ${levelColor[risk.riskLevel]}`}
        >

            <div className="flex items-center gap-3">

                <div
                    className={`w-9 h-9 sm:w-10 shrink-0 sm:h-10 flex items-center justify-center rounded-xl ${iconColor[risk.riskLevel]}`}
                >
                    <span className="text-white font-bold text-xs sm:text-sm">
                        !
                    </span>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm max-w-[180px] sm:max-w-xs">
                    {message}
                </p>

            </div>

            <FiChevronRight className="text-gray-500 text-lg" />

        </div>
    );
};

export default RiskSummary;