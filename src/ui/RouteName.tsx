import { MyProductType } from '@/types/product.type';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo({
  userProduct,
}: {
  userProduct: MyProductType[];
}) {
  const randomNumbersArray = userProduct.map((p) => p.piecesRemaining);
  const randomNameArray = userProduct.map((p) => p.title);

  return (
    <BarChart
      series={[{ data: randomNumbersArray }]}
      height={290}
      xAxis={[
        {
          data: randomNameArray,
          scaleType: 'band',
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
