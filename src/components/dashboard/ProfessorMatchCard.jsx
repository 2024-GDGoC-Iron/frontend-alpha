import React from 'react';

export const ProfessorMatchCard = ({ professor, onSelect, onShowDetail }) => {
    if (!professor) return null;

    return (
        <>
        </>
    );
        {/*
        <Card className="hover:shadow-md transition-all duration-200">
            <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <img
                        src={professor.image}
                        alt={professor.name}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold">{professor.name} 교수</h3>
                                <p className="text-gray-600">{professor.department}</p>
                                {professor.researchAreas && (
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {professor.researchAreas.map(area => (
                                            <span
                                                key={area}
                                                className="px-2 py-1 text-sm rounded-full border border-gray-200 text-gray-700"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                매칭률 {professor.matchScore}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">면담 진행 기간</span>
                        <span>{professor.period}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">잔여 인원</span>
                        <span
                            className={`px-2 py-1 rounded-full text-sm ${professor.availableSlots > 0
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {professor.availableSlots > 0 ? `${professor.availableSlots}명 가능` : "마감"}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onShowDetail(professor)}
                    >
                        자세한 정보 보기
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={() => onSelect(professor)}
                        disabled={professor.availableSlots === 0}
                    >
                        매칭 신청하기
                    </Button>
                </div>
            </div>
        </Card>
    */}
};