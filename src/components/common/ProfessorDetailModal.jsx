import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

export const ProfessorDetailModal = ({ professor, isOpen, onClose }) => {
    if (!professor) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-xl font-bold">교수 상세 정보</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                    >
                        닫기
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    {/* 기본 정보 섹션 */}
                    <div className="flex gap-6">
                        <img
                            src={professor.image}
                            alt={professor.name}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">{professor.name} 교수</h2>
                            <p className="text-gray-600 mb-4">{professor.department}</p>
                            <div className="flex gap-2 flex-wrap">
                                {professor.researchAreas?.map(area => (
                                    <Badge key={area} variant="outline">{area}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 연구 분야 및 프로젝트 섹션 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">주요 연구 분야</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {professor.researchDetails?.map((research, index) => (
                                <Card key={index} className="p-4">
                                    <h4 className="font-medium mb-2">{research.title}</h4>
                                    <p className="text-sm text-gray-600">{research.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 면담 가능 시간 섹션 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">면담 가능 시간</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">면담 진행 기간</p>
                                <p className="font-medium">{professor.period}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">잔여 인원</p>
                                <Badge variant={professor.availableSlots > 0 ? "success" : "destructive"}>
                                    {professor.availableSlots > 0 ? `${professor.availableSlots}명 가능` : "마감"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* 연구실 정보 섹션 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">연구실 정보</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">위치</p>
                                <p className="font-medium">{professor.labLocation}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">연구실 구성원</p>
                                <p className="font-medium">
                                    박사과정 {professor.labMembers?.phd || 0}명,
                                    석사과정 {professor.labMembers?.masters || 0}명
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 최근 논문 및 성과 섹션 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">최근 논문 및 성과</h3>
                        <div className="space-y-3">
                            {professor.recentPublications?.map((pub, index) => (
                                <div key={index} className="text-sm">
                                    <p className="font-medium">{pub.title}</p>
                                    <p className="text-gray-600">{pub.journal}, {pub.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};