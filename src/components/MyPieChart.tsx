import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Props {
  label: string;
  data: Record<string, any>[];
}

const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const MyPieChart = ({ data, label }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="text-lg font-medium text-gray-600">{label}</div>
    </div>
  );
};
