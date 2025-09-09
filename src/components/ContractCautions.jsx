import React from "react";

// Make sure getSeverityIcon is either imported or passed as a prop
const ContractCautions = ({
    factors,
    risk_level,
    category,
    title,
    getSeverityIcon,
    getRiskBgColor,
    getRiskColor,
}) => {
    const filtered = factors.filter((factor) => factor.category === category);

    const getRecommendation = (category) => {
        const normalized = category?.toLowerCase().replace(/s$/, "");
        switch (normalized) {
            case "risk factor":
                return "Review these risk factors and consider mitigation strategies (See Negotiation Points)";
            case "red flag":
                return "These red flags require attention. They should be negotiated and even removed if possible.";
            case "missing protection":
                return "If you can add these missing clauses, you'll be better protected";
            default:
                return "";
        }
    };

    if (filtered.length === 0) return null;

    return (
        <div>
            {title && (
                <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
            )}
            <ul className="space-y-2">
                {filtered.map((factor, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                        {/* Icon next to description */}
                        <span className="mt-0.5">
                            {getSeverityIcon(factor.severity)}
                        </span>
                        <span className="text-sm text-gray-600">
                            {factor.description}
                        </span>
                    </li>
                ))}
            </ul>
            {filtered[0].recommendation && (
                <div className={`${getRiskBgColor(risk_level)} rounded-lg`}>
                    <p
                        className={`text-sm ${getRiskColor(risk_level)} p-2 mt-2`}
                    >
                        <strong>Recommendation:</strong>{" "}
                        {getRecommendation(filtered[0].category)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContractCautions;
