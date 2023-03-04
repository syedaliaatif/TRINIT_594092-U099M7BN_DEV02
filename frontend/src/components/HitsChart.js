
//import { } from 'react-bootstrap';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Sector } from 'recharts';



const HitsChart = ({ data }) => {

    //const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#000000', '#00C49F'];

    data.sort((a, b) => {
        return a.totalHits > b.totalHits ? -1 : 1;
    });
    console.log(`Data in HitsChart: ${JSON.stringify(data)}`)
    let numHits = 0;
    for (let a of data) numHits += a.totalHits;

    const res = [];

    for (let i = 0; i < Math.min(5, data.length); i++) {
        res.push({
            name: data[i]._id,
            hits: data[i].totalHits
        });
        numHits -= data[i].totalHits;
    }

    if (numHits) res.push({
        name: 'Others',
        hits: numHits
    });
    console.log(`res is ${JSON.stringify(res)}`)
    const COLORS = ['#283739', '#2c5d63', '#263849', '#394a51', '#FFF042', '#000000'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${payload.hits}`}
            </text>
        );
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => { setActiveIndex(index); }
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#000000">{`${value} Hits`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };



    return (
        <Container className='d-flex justify-content-center' fluid>
            <PieChart width={500} height={500}>
                <Pie
                    data={res}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    innerRadius={100}
                    fill="#8884d8"
                    dataKey="hits"
                    onMouseEnter={onPieEnter}
                >
                    {res.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </Container>
    );
}

export default HitsChart; 