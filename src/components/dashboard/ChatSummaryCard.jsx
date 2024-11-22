export const ChatSummaryCard = ({ chat, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl border hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                    <img
                        src={chat.professorImage || "/api/placeholder/40/40"}
                        alt={chat.professorName}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-bold text-lg mb-1">{chat.professorName}</h3>
                        <p className="text-gray-600">{chat.department}</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">{chat.date}</span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">
                    {chat.summary}
                </p>
            </div>
        </div>
    );
};