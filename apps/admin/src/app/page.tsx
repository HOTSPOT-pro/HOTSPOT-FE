import { Button, DonutChartContainer } from '@hotspot/ui';

const page = () => {
  return (
    <div className="w-screen h-screen">
      <Button appName={''}>test</Button>
      <span className="text-blue-500">하이</span>
      <div className="w-80 h-80">
        <DonutChartContainer
          data={[
            { name: '김민준', value: 15 },
            { name: '이수진', value: 8.41235 },
            { name: '김서연', value: 18 },
            { name: '김민서', value: 12 },
          ]}
          total={85}
          type="MOBILE"
        />
        <DonutChartContainer
          data={[
            { name: '김민준', value: 15 },
            { name: '이수진', value: 8.41235 },
            { name: '김서연', value: 18 },
            { name: '김민서', value: 12 },
          ]}
          total={85}
          type="WEB"
        />
      </div>
    </div>
  );
};

export default page;
