import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function SpendingSummary({
  userName,
  email,
  currentWeek,
  foodExpense,
  livingExpense,
  fashionExpense,
  healthExpense,
  investmentExpense,
  transportationExpense,
  filteredData,
  COLORS,
  handleLogout
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-pretendard bg-[#FFFDF7] px-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#5C4033] leading-relaxed">
        환영합니다! <br />
        {userName || email}님!
      </h2>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-[#FFDAD6] text-[#5C4033] font-semibold rounded-xl shadow text-sm sm:text-base"
      >
        로그아웃
      </button>

      <div className="mt-8 text-[#5C4033]">
        <h3 className="text-xl sm:text-2xl font-bold">이번주 소비 금액 :</h3>
        <h3 className="text-lg sm:text-xl">{currentWeek.toLocaleString()} 원</h3>
        <h4 className="mt-4 font-semibold">카테고리 별 소비:</h4>
        <ul className="mt-2 text-base sm:text-lg text-left">
          <li>음식 : {foodExpense.toLocaleString()} 원</li>
          <li>생필품 : {livingExpense.toLocaleString()} 원</li>
          <li>패션/의류 : {fashionExpense.toLocaleString()} 원</li>
          <li>건강 : {healthExpense.toLocaleString()} 원</li>
          <li>투자 : {investmentExpense.toLocaleString()} 원</li>
          <li>교통 : {transportationExpense.toLocaleString()} 원</li>
        </ul>
      </div>

      <div className="mt-10 w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
